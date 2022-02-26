import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormularComponent } from './components/formular/formular.component';
import { KundenComponent } from './components/kunden/kunden.component';

const routes: Routes = [
  { path: '', component: FormularComponent },
  { path: 'data', component: KundenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
