import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {HttpService} from "../../services/http.service";
import {people_v1} from "googleapis";
import {Person} from "../../model/person";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-select-pilot-in-command',
  templateUrl: './select-pilot-in-command.component.html',
  styleUrls: ['./select-pilot-in-command.component.scss']
})
export class SelectPilotInCommandComponent implements OnInit, OnDestroy {

  @Input() control!: FormControl;

  private peopleSubscription !: Subscription;

  public people!: Person[];

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getPeople();
  }

  getPeople() {
    this.peopleSubscription = this.httpService.getPeople().subscribe({
      next: people => {
        this.people = people;
        this.people.sort((a, b) => a.name.localeCompare(b.name));
      },
      error: err => {
        console.error(err);
      },
      complete: () => {
      }
    });
  }

  ngOnDestroy() {
    if (typeof this.peopleSubscription !== "undefined") {
      this.peopleSubscription.unsubscribe();
    }
  }
}
