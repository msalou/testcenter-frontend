import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Kunde } from 'src/app/models/kunde';
import { Testung } from 'src/app/models/testung';
import { KundeService } from 'src/app/services/kunde.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-kunden',
  templateUrl: './kunden.component.html',
  styleUrls: ['./kunden.component.scss']
})
export class KundenComponent implements OnInit {
  displayedColumns: string[] = ['select', 'nachname', 'vorname', 'strasse', 'plz', 'ort', 'geburtsdatum', 'email', 'telefon'];
  selection = new SelectionModel<Kunde>(false, []);
  
  kunden = [] as Kunde[];
  selectedKunde = {} as Kunde;
  testung = {} as Testung;

  constructor(private kundeService: KundeService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getKunden();
  }

  onClickMail(): void {
    for (let selectedKunde of this.selection.selected) {
      
    }
  }

  onClickPrint(): void {
    for (let selectedKunde of this.selection.selected) {
      this.dialog.open(ModalComponent, {
        data: { kunde: selectedKunde }
      });
    }
  }

  onClickDelete(): void {
    for (let selectedKunde of this.selection.selected) {
      this.kundeService.deleteKunde(selectedKunde.id).subscribe(_ => this.getKunden());
    }
  }

  onClickRefresh(): void {
    this.getKunden();
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
}


