import { Component } from '@angular/core';

export interface Location{
  name:string,
  latitude:number,
  longitude:number
}
@Component({
  selector: 'app-delivery-tracking',
  templateUrl: './delivery-tracking.component.html',
  styleUrls: ['./delivery-tracking.component.css']
})
export class DeliveryTrackingComponent {
 locations:Location[] =[
  
  {
      name: 'Chennai',
      latitude: 13.0827,
      longitude: 80.2707
    },
    {
      name: 'Hosur',
      latitude: 12.7409,
      longitude: 77.8253
    },
    {
      name: 'Bengaluru',
      latitude: 12.9716,
      longitude: 77.5946
    },
    {
      name: 'Vellore',
      latitude: 12.9165,
      longitude: 79.1325
    },
    {
      name: 'Krishnagiri',
      latitude: 12.5186,
      longitude: 78.2137
    },
    {
      name: 'Salem',
      latitude: 11.6643,
      longitude: 78.1460
    },
    {
      name: 'Coimbatore',
      latitude: 11.0168,
      longitude: 76.9558
    },
    {
      name: 'Madurai',
      latitude: 9.9252,
      longitude: 78.1198
    },
    {
      name: 'Tiruchirappalli',
      latitude: 10.7905,
      longitude: 78.7047
    },
    {
      name: 'Puducherry',
      latitude: 11.9416,
      longitude: 79.8083
    }

 ]
 source:Location |null = null;
 destination:Location |null = null;
 truckPosition:Location | null = null
 shipmentTracking !: {source:Location,destination:Location,truckPosition:Location};
 TrackingStarted:Boolean = false;
 formSubmit(){
      if(!this.source){
        console.log('Source is empty')
        this.TrackingStarted = false;
        return
      }
      if(!this.destination){
        console.log('Destination is empty')
        this.TrackingStarted = false;
        return
      }
      if(!this.truckPosition){
        this.truckPosition = {...this.source}
      }

      this.shipmentTracking = {source:this.source,destination: this.destination,truckPosition:this.truckPosition}
      if(this.shipmentTracking){
        this.TrackingStarted = true;
        return
      }
      // console.log(this.shipmentTracking )
      return
 }
}
