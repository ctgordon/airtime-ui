import {Component, OnDestroy, OnInit} from '@angular/core';
import {Person} from "../../model/person";
import {environment} from "../../../environments/environment";
import {Subscription} from "rxjs";
import {HttpService} from "../../services/http.service";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit, OnDestroy {

  public people!: Person[];

  private subscription!: Subscription;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getPeople();
  }

  getPeople() {
    this.subscription = this.httpService.getData(`${environment.apiServer}${environment.app}${environment.endpoint}/people/`).subscribe({
      next: (v) => {
        this.people = v;
      },
      error: (e) => {
        console.error(e)
      },
      complete: () => {
      }
    });
  }

  ngOnDestroy() {
    if (typeof this.subscription !== undefined) {
      this.subscription.unsubscribe();
    }
  }
}
