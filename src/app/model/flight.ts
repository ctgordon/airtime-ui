import {Aircraft} from "./aircraft";
import {Person} from "./person";
import {Airport} from "./airport";

export class Flight {
  id!: number;
  aircraft!: Aircraft;
  pilotInCommand!: Person;
  departureAirport!: Airport;
  arrivalAirport!: Airport;
  departureDatetime!: string;
  arrivalDatetime!: string;
  remarks!: string;
}
