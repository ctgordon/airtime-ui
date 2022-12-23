import { Injectable } from '@angular/core';
import {AirportInfo} from "../model/airport.info";
import {Airport} from "../model/airport";

@Injectable({
  providedIn: 'root'
})
export class AirportInfoService {

  constructor() { }

  getAirportInfo() {
    /*const airportCode = 'KSEE';
    const filtered = this.airportList.filter(it => it.airportCode === airportCode);
    if (!filtered.length) {
      this.airportInfoSubscription = this.httpService.getAirportInfo(airportCode).subscribe({
        next: (airportInfo: AirportInfo) => {
          if (airportInfo) {
            console.log(airportInfo);
            const airport: Airport = {
              airportCode: airportInfo.icao,
              airportName: airportInfo.name,
              cityName: airportInfo.county,
              countryCode: airportInfo.country_iso,
              countryName: airportInfo.country,
              id: 0,
              latitude: airportInfo.latitude,
              longitude: airportInfo.longitude
            };
            this.save(airport);
          }
        },
        error: err => {
          console.error(err);
        },
        complete: () => {
        }
      });
    } else {
      window.alert(`${airportCode} already exists`);
    }*/
  }
}
