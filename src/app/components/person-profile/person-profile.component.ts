import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../services/http.service";
import * as moment from "moment/moment";
import {environment} from "../../../environments/environment";
import {Person} from "../../model/person";
import {Weight} from "../../model/weight";

@Component({
  selector: 'app-person-profile',
  templateUrl: './person-profile.component.html',
  styleUrls: ['./person-profile.component.scss']
})
export class PersonProfileComponent implements OnInit {

  public loading !: boolean;
  public person !: Person;
  public weight!: Weight;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.loading = true;
    this.getPerson();
  }

  getPerson() {
    this.httpService.getPerson().subscribe({
      next: (person) => {
        this.person = person;

        if (this.person.personAttributes) {
          const attributes = this.person.personAttributes;
          attributes.forEach(attr => {
            if (attr.personAttributeType.type.toUpperCase() === 'WEIGHT') {
              const kg = attr.value;
              const lb = Number(Number(kg * 2.204623).toFixed(2));
              const stones = Math.round(lb / 14);
              const remainder = Math.round(lb % 14);
              this.weight = new Weight();
              this.weight.kg = kg;
              this.weight.lb = lb;
              this.weight.stones = stones;
              this.weight.remainder = remainder;
            }
          });
        }
      },
      error: (e) => {
        console.error(e)
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
