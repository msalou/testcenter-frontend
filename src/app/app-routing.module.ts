import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatenschutzComponent } from './components/datenschutz/datenschutz.component';
import { FormularComponent } from './components/formular/formular.component';
import { ImpressumComponent } from './components/impressum/impressum.component';
import { KundenComponent } from './components/kunden/kunden.component';

const routes: Routes = [
  { path: '', component: FormularComponent },
  { path: 'data', component: KundenComponent },
  { path: 'datenschutz', component: DatenschutzComponent },
  { path: 'impressum', component: ImpressumComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
