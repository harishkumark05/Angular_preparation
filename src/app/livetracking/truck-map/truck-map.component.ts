import { Component, Input, SimpleChanges } from '@angular/core';
import { TruckPosition } from '../livetracking.component';
import * as L from 'leaflet';

@Component({
  selector: 'app-truck-map',
  templateUrl: './truck-map.component.html',
  styleUrls: ['./truck-map.component.css']
})
export class TruckMapComponent {
@Input()
  position: TruckPosition | null = null;

  private map!: L.Map;

  private marker!: L.Marker;

  private mapReady = false;


  /*
   * 🔥 THIS WILL RUN WHENEVER
   * THE PARENT POSITION CHANGES
   */

  ngOnChanges(
    changes: SimpleChanges
  ): void {

    console.log(
      '🔥 ngOnChanges()'
    );

    console.log(
      changes
    );


    if (
      changes['position'] &&
      this.position
    ) {

      console.log(
        'Truck moved!'
      );

      console.log(
        'Latitude:',
        this.position.latitude
      );

      console.log(
        'Longitude:',
        this.position.longitude
      );


      if (this.mapReady) {

        this.updateMarker();

      }
    }
  }


  ngAfterViewInit(): void {

    this.map =
      L.map('map')
        .setView(
          [13.0827, 80.2707],
          13
        );


    L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          '&copy; OpenStreetMap contributors'
      }
    ).addTo(this.map);


    const icon =
      L.icon({

        iconUrl:
          'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',

        shadowUrl:
          'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',

        iconSize: [25, 41],

        iconAnchor: [12, 41],

        popupAnchor: [1, -34],

        shadowSize: [41, 41]
      });


    this.marker =
      L.marker(
        [13.0827, 80.2707],
        { icon }
      ).addTo(this.map);


    this.marker.bindPopup(
      'Waiting for GPS...'
    );


    this.mapReady = true;


    if (this.position) {

      this.updateMarker();

    }
  }


  private updateMarker(): void {

    if (
      !this.position ||
      !this.marker
    ) {
      return;
    }


    const location:
      L.LatLngExpression = [

        this.position.latitude,

        this.position.longitude

      ];


    /*
     * Move truck marker.
     */

    this.marker.setLatLng(
      location
    );


    /*
     * Move map.
     */

    this.map.panTo(
      location
    );


    /*
     * Update popup.
     */

    this.marker.setPopupContent(`

      <b>🚚 Truck</b>

      <br><br>

      Latitude:
      ${this.position.latitude}

      <br>

      Longitude:
      ${this.position.longitude}

      <br>

      Speed:
      ${this.position.speed ?? 0}

    `);
  }
}
