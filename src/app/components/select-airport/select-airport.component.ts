import {Component, Input, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpService} from "../../services/http.service";
import {Airport} from "../../model/airport";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-select-airport',
  templateUrl: './select-airport.component.html',
  styleUrls: ['./select-airport.component.scss']
})
export class SelectAirportComponent implements OnInit {

  @Input() control !: FormControl;
  @Input() label !: string;

  public airportList!: Airport[];

  private airportSubscription !: Subscription;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getAirports();
  }

  getAirports() {
    this.airportSubscription = this.httpService.getAirports().subscribe({
      next: airports => {
        this.airportList = airports;
        this.airportList.sort((a, b) => a.airportName.localeCompare(b.airportName));
      },
      error: (e) => {
        console.error(e);
      },
      complete: () => {
      }
    });
  }

}
