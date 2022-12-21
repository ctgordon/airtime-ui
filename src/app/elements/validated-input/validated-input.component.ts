import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-validated-input',
  templateUrl: './validated-input.component.html',
  styleUrls: ['./validated-input.component.scss']
})
export class ValidatedInputComponent implements OnInit {

  @Input() control!: FormControl;
  @Input() label!: string;
  @Input() type!: string;

  public id!:string;

  constructor() { }

  ngOnInit(): void {
    this.id = this.label.replace(/\s+/g, '').toLowerCase();
  }

}
