import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BarcodeFormat } from '@zxing/library';
import { Kunde } from 'src/app/models/kunde';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.scss']
})
export class ScannerComponent implements OnInit {
  allowedFormats = [ BarcodeFormat.QR_CODE ];

  kunde = {} as Kunde;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  onCodeResult(resultString: string) {
    this.dialog.ngOnDestroy();
    this.kunde = JSON.parse(resultString);;
    this.dialog.open(ModalComponent, {
      data: { kunden: [this.kunde] }
    });
  }

}
