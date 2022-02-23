import { Component, OnInit } from '@angular/core';
import { Kunde } from 'src/app/models/kunde';

@Component({
  selector: 'app-formular',
  templateUrl: './formular.component.html',
  styleUrls: ['./formular.component.scss'],
})
export class FormularComponent implements OnInit {

  kunde = {} as Kunde; 

  constructor() {}

  ngOnInit(): void {
  }
}
