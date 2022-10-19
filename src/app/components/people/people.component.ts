import {Component, OnDestroy, OnInit} from '@angular/core';
import {Person} from "../../model/person";
import {environment} from "../../../environments/environment";
import {Subscription} from "rxjs";
import {HttpService} from "../../services/http.service";
import {TableConfig} from "../../model/table.config";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit, OnDestroy {

  public people!: Person[];
  public tableConfig: TableConfig = {
    data: [],
    headers: ['Name', 'Moniker', 'Role'],
    editable: true,
  };

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
        this.tableConfig.data = [];

        this.people.forEach(person => {
          this.tableConfig.data.push({obj: person, values: [person.name, person.moniker, person.personRole.role]});
        });
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
