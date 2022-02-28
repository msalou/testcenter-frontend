import { Component, OnInit } from '@angular/core';
import { Kunde } from 'src/app/models/kunde';
import { Message } from 'src/app/models/message';
import { KundeService } from 'src/app/services/kunde.service';
import { environment } from 'src/environments/environment';

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
  sendbuttontext = 'Abschicken';
  loadingButton = false;

  featureToggleQRCode = environment.featureToggleQRCode;
  showQRCode = false;
  qrdata = '{ "nachname": "{1}", "vorname": "{2}", "strasse": "{3}", "plz": "{4}", "ort": "{5}", "geburtsdatum": "{6}", "email": "{7}", "telefon": "{8}" }';

  constructor(private kundeService: KundeService) {}

  ngOnInit(): void {
  }

  onClick(): void {
    if (this.isFormularFilled(this.kunde)) {
      this.showError = false;
      this.loadingButton = true;
      this.kundeService.createKunde(this.kunde)
        .subscribe(message => {
          this.message = message;
          this.sendbuttontext = 'Nochmal abschicken';
          this.loadingButton = false;
          this.generateQRCode();
        });
    } else {
      this.showError = true;
    }
  }

  isFormularFilled(kunde: Kunde): boolean {
    return Object.keys(kunde).length == 8 && 
      Object.values(kunde).every(property => (property !== null && property !== '')) &&
      this.checkboxChecked;
  }

  generateQRCode(): void {
    this.qrdata = this.qrdata
      .replace('{1}', this.kunde.nachname)
      .replace('{2}', this.kunde.vorname)
      .replace('{3}', this.kunde.strasse)
      .replace('{4}', this.kunde.plz)
      .replace('{5}', this.kunde.ort)
      .replace('{6}', this.kunde.geburtsdatum)
      .replace('{7}', this.kunde.email)
      .replace('{8}', this.kunde.telefon);
    this.showQRCode = true;
  }
}

