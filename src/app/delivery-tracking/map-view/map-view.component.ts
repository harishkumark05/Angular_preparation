import { Component, Input, SimpleChanges } from '@angular/core';
import { Location } from '../delivery-tracking.component';
import * as L from 'leaflet'
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent {
@Input() shipment!:{source:Location,destination:Location,truckPosition:Location}
private shipmentMap!:L.Map
// private tileViewData!:{latitude:number,longitude:number}
private mapReady = false;
private shipmentLayers = L.layerGroup();
ngOnChanges(changes:SimpleChanges){
 console.log(changes)
//  if(changes['shipment']?.firstChange){
//   this.tileViewData = {
//     latitude:changes['shipment'].currentValue.source.latitude,
//     longitude:changes['shipment'].currentValue.source.longitude
//   }
//   return  
// }
if(this.mapReady){
  this.updateMap()
}


}
constructor(private http:HttpClient){}
ngAfterViewInit(){
  const options: L.MapOptions = {
  center: L.latLng(this.shipment.source.latitude, this.shipment.source.longitude),
  zoom: 9,
};

 this.shipmentMap= L.map('map', options);
 L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(this.shipmentMap)
// Add shipment layer group to map 
this.shipmentLayers.addTo(this.shipmentMap);
    this.mapReady = true;
  if(this.shipmentMap){
    this.updateMap()
  }
}
updateMap(){
    if(!this.shipmentMap || !this.shipment){
      return
    }
    //  Clear previous markers and route 
    this.shipmentLayers.clearLayers();
         const icon = L.icon({
        iconUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png'
      })
    L.marker([this.shipment.source.latitude, this.shipment.source.longitude],{icon}).addTo(this.shipmentLayers)
    .bindPopup(`source:${this.shipment.source.name}`)
    .openPopup();
    L.marker([this.shipment.destination.latitude, this.shipment.destination.longitude],{icon}).addTo(this.shipmentLayers)
    .bindPopup(`destination ${this.shipment.destination.name}`)
    // now tracking
    let osrmUrl = `https://router.project-osrm.org/route/v1/driving/${this.shipment.source.longitude},${this.shipment.source.latitude};${this.shipment.destination.longitude},${this.shipment.destination.latitude}?overview=full&geometries=geojson`
    this.http.get<any>(osrmUrl)
    .subscribe(response =>{
      if(response.code !== 'Ok'){
        console.log('osrm route not found');
        return
      }
      let leafletCoordinates = response.routes[0].geometry.coordinates.map((e:[number,number])=>{
        return [e[1],e[0]]
      })

      // choose random coordinates for GPS data from osrm coordinates
      
      const randomIndex = Math.floor(Math.random()* leafletCoordinates.length)
      const truckCordinates = leafletCoordinates[randomIndex];
      const truckIcon = L.icon({
          iconUrl: 'assets/delivery.png',

          iconSize: [40, 40],

          iconAnchor: [20, 20],

          popupAnchor: [0, -20]
              });


        L.marker(
          truckCordinates,
          { icon: truckIcon }
        )
        .addTo(this.shipmentLayers)
        .bindPopup('Truck 🚚')
        .openPopup();
     
       L.polyline(leafletCoordinates, {color: 'red'}).addTo(this.shipmentLayers);

    })

}
}
