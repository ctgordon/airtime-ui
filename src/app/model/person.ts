import {PersonRole} from "./person.role";
import {PersonAttribute} from "./person.attribute";

export class Person {
  id!: number;
  name!: string;
  moniker!: string;
  personRole !: PersonRole;
  personAttributes!: Array<PersonAttribute>;
}
