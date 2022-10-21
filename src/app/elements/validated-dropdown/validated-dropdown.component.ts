import {Component, Input, OnInit} from '@angular/core';
import {ValidatedDropdown} from "../../model/validated.dropdown";

@Component({
  selector: 'app-validated-dropdown',
  templateUrl: './validated-dropdown.component.html',
  styleUrls: ['./validated-dropdown.component.scss']
})
export class ValidatedDropdownComponent implements OnInit {

  @Input() params!: ValidatedDropdown;

  constructor() { }

  ngOnInit(): void {
  }

}
