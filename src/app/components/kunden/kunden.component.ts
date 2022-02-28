import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Kunde } from 'src/app/models/kunde';
import { Testung } from 'src/app/models/testung';
import { KundeService } from 'src/app/services/kunde.service';
import { ModalComponent } from '../modal/modal.component';
import { ScannerComponent } from '../scanner/scanner.component';

@Component({
  selector: 'app-kunden',
  templateUrl: './kunden.component.html',
  styleUrls: ['./kunden.component.scss']
})
export class KundenComponent implements OnInit {
  displayedColumns: string[] = ['select', 'nachname', 'vorname', 'strasse', 'plz', 'ort', 'geburtsdatum', 'email', 'telefon'];
  selection = new SelectionModel<Kunde>(false, []);
  MAX_NUMBER_SELECTION = 10;
  
  kunden = [] as Kunde[];
  testung = {} as Testung;
  showMultiselectError = false;

  constructor(private kundeService: KundeService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getKunden();
  }

  onClickPrint(): void {
    if (this.selection.selected.length < 1 || this.selection.selected.length > this.MAX_NUMBER_SELECTION) {
      this.showMultiselectError = true;
    } else {
      this.showMultiselectError = false;
      if (this.selection.selected.length >= 1) {
        this.dialog.open(ModalComponent, {
          data: { kunden: this.selection.selected }
        });
      }
    }
  }

  onClickDelete(): void {
    if (this.selection.selected.length < 1 || this.selection.selected.length > this.MAX_NUMBER_SELECTION) {
      this.showMultiselectError = true;
    } else {
      this.showMultiselectError = false;
      for (let selectedKunde of this.selection.selected) {
        this.kundeService.deleteKunde(selectedKunde.id).subscribe(_ => this.getKunden());
      }
      this.selection = new SelectionModel<Kunde>(false, []);
    }
  }

  onClickRefresh(): void {
    this.getKunden();
    this.showMultiselectError = false;
    this.selection = new SelectionModel<Kunde>(false, []);
  }

  getKunden(): void {
    this.kundeService.getKunden()
    .subscribe(kunden => this.kunden = kunden.sort((a: { id: number; }, b: { id: number; }) => (a.id < b.id) ? 1 : -1));
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.kunden.length;
    return numSelected == numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.kunden.forEach(row => this.selection.select(row));
  }

  onClickScanQR(): void {
    this.showMultiselectError = false;
    this.selection = new SelectionModel<Kunde>(false, []);
    this.dialog.open(ScannerComponent);
  }
}


