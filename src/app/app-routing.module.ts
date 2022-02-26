import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatenschutzComponent } from './components/datenschutz/datenschutz.component';
import { FormularComponent } from './components/formular/formular.component';
import { ImpressumComponent } from './components/impressum/impressum.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', component: FormularComponent },
  { path: 'login', component: LoginComponent },
  { path: 'datenschutz', component: DatenschutzComponent },
  { path: 'impressum', component: ImpressumComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
