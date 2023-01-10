import {Component, OnInit} from '@angular/core';
import {Flight} from "../../model/flight";

@Component({
  selector: 'app-next-flight',
  templateUrl: './next-flight.component.html',
  styleUrls: ['./next-flight.component.scss']
})
export class NextFlightComponent implements OnInit {

  public loading !: boolean
  public flight !: Flight;

  constructor() {
  }

  ngOnInit(): void {
  }

}
