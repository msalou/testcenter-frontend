import { Component, OnInit } from '@angular/core';
import { Kunde } from 'src/app/models/kunde';

@Component({
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.scss'],
})
export class FormularComponent implements OnInit {

  kunde = {} as Kunde;
  showError = false;

  constructor() {}

  ngOnInit(): void {
  }

  onClick(): void {
    if (this.isFormularFilled(this.kunde)) {
      this.showError = false;
      console.log(this.kunde);
    } else {
      this.showError = true;
    }
  }

  isFormularFilled(kunde: Kunde): boolean {
    return Object.keys(kunde).length == 8 && Object.values(kunde).every(property => (property !== null && property !== ''));
  }
}
