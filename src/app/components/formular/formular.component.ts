import { Component, OnInit } from '@angular/core';
import { Kunde } from 'src/app/models/kunde';
import { Message } from 'src/app/models/message';
import { KundeService } from 'src/app/services/kunde.service';

@Component({
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.scss'],
})
export class FormularComponent implements OnInit {

  kunde = {} as Kunde;
  message = {} as Message;
  showError = false;
  checkboxChecked = false;

  constructor(private kundeService: KundeService) {}

  ngOnInit(): void {
  }

  onClick(): void {
    if (this.isFormularFilled(this.kunde)) {
      this.showError = false;
      this.kundeService.createKunde(this.kunde)
        .subscribe(message => this.message = message);
    } else {
      this.showError = true;
    }
  }

  isFormularFilled(kunde: Kunde): boolean {
    return Object.keys(kunde).length == 8 && 
      Object.values(kunde).every(property => (property !== null && property !== '')) &&
      this.checkboxChecked;
  }
}
