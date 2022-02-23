import { Component, OnInit } from '@angular/core';
import { Kunde } from 'src/app/models/kunde';
import { KundeService } from 'src/app/services/kunde.service';

@Component({
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.scss'],
})
export class FormularComponent implements OnInit {

  kunde = {} as Kunde;
  showError = false;

  constructor(private kundeService: KundeService) {}

  ngOnInit(): void {
  }

  onClick(): void {
    if (this.isFormularFilled(this.kunde)) {
      this.showError = false;
      this.kundeService.createKunde(this.kunde);
    } else {
      this.showError = true;
    }
  }

  isFormularFilled(kunde: Kunde): boolean {
    return Object.keys(kunde).length == 8 && Object.values(kunde).every(property => (property !== null && property !== ''));
  }
}
