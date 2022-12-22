import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {

  @Input() control!: FormControl;
  @Input() label !: string

  public id !: string;

  constructor() {
  }

  ngOnInit(): void {
    this.id = this.label.replace(/\s+/g, '').toLowerCase();
  }

}
