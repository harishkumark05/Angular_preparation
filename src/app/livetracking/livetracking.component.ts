import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';

export interface TruckPosition { 
  deviceId: number;
   latitude: number; 
   longitude: number;
   speed?: number; 
   course?: number; }
@Component({
  selector: 'app-livetracking',
  templateUrl: './livetracking.component.html',
  styleUrls: ['./livetracking.component.css']
})
export class LivetrackingComponent {
private readonly traccarUrl =
    '/traccar';

  // YOUR Traccar token
  private readonly token =environment.liveToken
    

  // The uniqueId shown by Traccar Client
  private readonly uniqueId =environment.liveUniqueId
    

  private deviceId!: number;

  private intervalId: any;

  position: TruckPosition | null = null;

  loading = true;

  error = '';

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    this.findDevice();
  }


  /*
   * STEP 1
   *
   * Find the Traccar device using
   * the uniqueId from the driver's phone.
   */

  private findDevice(): void {

    const headers =
      new HttpHeaders({
        'Authorization':
          `Bearer ${this.token}`
      });

    const params =
      new HttpParams()
        .set('uniqueId', this.uniqueId);

    this.http.get<any[]>(
      `${this.traccarUrl}/api/devices`,
      {
        headers,
        params
      }
    ).subscribe({

      next: (devices) => {

        console.log(
          'Devices:',
          devices
        );

        if (!devices.length) {

          this.error =
            'Device not found';

          this.loading = false;

          return;
        }


        /*
         * Traccar's internal device ID.
         */

        this.deviceId =
          devices[0].id;

        console.log(
          'Found device:',
          this.deviceId
        );


        this.loading = false;


        /*
         * Start getting location.
         */

        this.getPosition();

        this.intervalId =
          setInterval(() => {

            this.getPosition();

          }, 5000);
      },

      error: (err) => {

        console.error(
          'Device lookup failed:',
          err
        );

        this.error =
          'Could not find Traccar device';

        this.loading = false;
      }
    });
  }


  /*
   * STEP 2
   *
   * Get the latest location.
   */

  private getPosition(): void {

    if (!this.deviceId) {
      return;
    }


    /*
     * Traccar positions API needs
     * a time range when filtering
     * by deviceId.
     */

    const now =
      new Date();

    const fiveMinutesAgo =
      new Date(
        now.getTime() -
        5 * 60 * 1000
      );


    const params =
      new HttpParams()
        .set(
          'deviceId',
          this.deviceId
        )
        .set(
          'from',
          fiveMinutesAgo.toISOString()
        )
        .set(
          'to',
          now.toISOString()
        );


    const headers =
      new HttpHeaders({
        'Authorization':
          `Bearer ${this.token}`
      });


    this.http.get<any[]>(
      `${this.traccarUrl}/api/positions`,
      {
        headers,
        params
      }
    ).subscribe({

      next: (positions) => {

        console.log(
          'Positions:',
          positions
        );


        if (!positions.length) {

          console.log(
            'No recent position'
          );

          return;
        }


        /*
         * Latest position.
         *
         * Usually the last item is
         * the newest position.
         */

        const latest =
          positions[positions.length - 1];


        this.position = {

          deviceId:
            latest.deviceId,

          latitude:
            latest.latitude,

          longitude:
            latest.longitude,

          speed:
            latest.speed,

          course:
            latest.course
        };


        console.log(
          '📍 Truck location:',
          this.position
        );
      },

      error: (err) => {

        console.error(
          'Position API failed:',
          err
        );
      }
    });
  }


  ngOnDestroy(): void {

    if (this.intervalId) {

      clearInterval(
        this.intervalId
      );
    }
  }

}
