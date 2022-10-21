import {FormControl} from "@angular/forms";

export class ValidatedDropdown {
  label!: string;
  id!: string;
  list!: Array<any>;
  optionValue!: string;
  optionLabel!: string;
  formControl!: FormControl;
}
