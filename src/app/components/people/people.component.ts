import {Component, OnDestroy, OnInit} from '@angular/core';
import {Person} from "../../model/person";
import {environment} from "../../../environments/environment";
import {Subscription} from "rxjs";
import {HttpService} from "../../services/http.service";
import {TableConfig} from "../../model/table.config";
import {PersonRole} from "../../model/person.role";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Airport} from "../../model/airport";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit, OnDestroy {

  public loading: boolean = false;
  public people!: Person[];
  public personRoles!: PersonRole[];
  public tableConfig: TableConfig = {
    data: [],
    headers: ['Name', 'Moniker', 'Role'],
    editable: true,
  };
  public peopleForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, [Validators.required]),
    moniker: new FormControl(null, [Validators.required]),
    personRole: new FormControl(null, [Validators.required])
  });

  private peopleSubscription!: Subscription;
  private personRoleSubscription!: Subscription;

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getPeople();
    this.getPersonRoles();
  }

  getPeople() {
    this.loading = true;
    this.peopleSubscription = this.httpService.getPeople().subscribe({
      next: (v) => {
        this.people = v;
        this.tableConfig.data = [];

        this.people.forEach(person => {
          this.tableConfig.data.push({obj: person, values: [person.name, person.moniker, person.personRole.role]});
        });
        this.loading = false;
      },
      error: (e) => {
        console.error(e)
        this.loading = false;
      },
      complete: () => {
      }
    });
  }

  getPersonRoles() {
    this.personRoleSubscription = this.httpService.getData(`${environment.apiServer}${environment.app}${environment.endpoint}/person-roles/`).subscribe({
      next: (personRoles) => {
        this.personRoles = personRoles;
      },
      error: (e) => {
        console.error(e)
      },
      complete: () => {
      }
    });
  }

  get id(): FormControl {
    return this.peopleForm.get('id') as FormControl;
  }

  get name(): FormControl {
    return this.peopleForm.get('name') as FormControl;
  }

  get moniker(): FormControl {
    return this.peopleForm.get('moniker') as FormControl;
  }

  get personRole(): FormControl {
    return this.peopleForm.get('personRole') as FormControl;
  }

  save() {
    this.loading = true;

    const person: Person = {id: 0, moniker: "", name: "", personRole: {id: 0, role: ''}};

    if (this.peopleForm.valid) {
      person.id = this.id.value;
      person.name = this.name.value;
      person.moniker = this.moniker.value;
      const filtered = this.personRoles.find(role => role.id === Number(this.personRole.value));
      if (filtered && typeof filtered !== 'undefined') {
        person.personRole = filtered
      }
    }

    this.httpService.postData(`${environment.apiServer}${environment.app}${environment.endpoint}/person/`, person).subscribe({
      next: (v) => {
        this.getPeople();
        this.peopleForm.reset();
        this.loading = false;
      },
      error: (e) => {
        console.error(e)
        this.loading = false;
      },
      complete: () => {
        console.log('Getting here');
      }
    });
  }

  editPerson(person: Person) {
    this.id.patchValue(person.id);
    this.name.patchValue(person.name);
    this.moniker.patchValue(person.moniker);
    this.personRole.patchValue(person.personRole.id);
  }

  ngOnDestroy() {
    if (typeof this.peopleSubscription !== 'undefined') {
      this.peopleSubscription.unsubscribe();
    }
  }
}
