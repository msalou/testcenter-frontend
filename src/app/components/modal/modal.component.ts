import {formatDate} from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Kunde } from 'src/app/models/kunde';
import { Testung } from 'src/app/models/testung';
import { Zertifikat } from 'src/app/models/zertifikat';
import { KundeService } from 'src/app/services/kunde.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  selectedKunde = {} as Kunde;
  testung = {} as Testung;
  mailbuttontext = 'Zertifikat als E-Mail verschicken';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private kundeService: KundeService) {
    this.selectedKunde = data.kunde;
  }

  ngOnInit(): void {
    this.testung.ergebnis = 'negativ';
    this.testung.testername = 'CLUNGENE COVID-19';
    const date = new Date();
    this.testung.datum = formatDate(date, 'dd.MM.yyyy', 'en');
    this.testung.uhrzeit = date.getHours() + ':' + date.getMinutes();
  }
  
  onClickPrint(): void {
    const zertifikat = {
      kunde: this.selectedKunde,
      testung: this.testung
    } as Zertifikat;
    this.kundeService.printZertifikat(zertifikat).subscribe(res => {
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
    });
  }

  onClickSendMail(): void {
    const zertifikat = {
      kunde: this.selectedKunde,
      testung: this.testung
    } as Zertifikat;
    this.kundeService.sendZertifikat(zertifikat).subscribe(
      _ => this.mailbuttontext = 'Nochmal versenden'
    );
  }

}
