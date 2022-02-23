import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Kunde } from '../models/kunde';

@Injectable({
  providedIn: 'root',
})
export class KundeService {

  constructor(private httpClient: HttpClient) {}

  createKunde(kunde: Kunde) {
    return this.httpClient.post(environment.apiUrl + '/createKunde', kunde)
      .pipe(catchError(error => this.handleError(error)));
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Ein Fehler ist aufgetreten. Bitte melden Sie sich beim Testzentrum.'));
  }
}
