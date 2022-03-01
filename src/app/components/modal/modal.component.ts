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

  selectedKunden = [] as Kunde[];
  testung = {} as Testung;
  mailbuttontext = 'Zertifikat als E-Mail verschicken';
  loadingButton = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private kundeService: KundeService) {
    this.selectedKunden = data.kunden;
  }

  ngOnInit(): void {
    this.testung.ergebnis = 'negativ';
    this.testung.testername = 'Green Spring SARS-CoV-Antigen-Schnelltest AT417/20';
    const date = new Date();
    this.testung.datum = formatDate(date, 'dd.MM.yyyy', 'en');
    this.testung.uhrzeit = date.getHours().toString().padStart(2 ,"0") + ':' + date.getMinutes().toString().padStart(2 ,"0");
  }
  
  onClickPrint(): void {
    for (let selectedKunde of this.selectedKunden) {
      const zertifikat = {
        kunde: selectedKunde,
        testung: this.testung
      } as Zertifikat;
      this.kundeService.printZertifikat(zertifikat).subscribe(res => {
        const fileURL = URL.createObjectURL(res);
        window.open(fileURL, '_blank');
      });
    }
  }

  onClickSendMail(): void {
    for (let selectedKunde of this.selectedKunden) {
      const zertifikat = {
        kunde: selectedKunde,
        testung: this.testung
      } as Zertifikat;
      this.loadingButton = true;
      this.kundeService.sendZertifikat(zertifikat).subscribe(_ => {
        this.mailbuttontext = 'Nochmal versenden';    
        this.loadingButton = false;
      });
    }
  }

}
