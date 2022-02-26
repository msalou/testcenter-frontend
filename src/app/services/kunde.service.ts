import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Kunde } from '../models/kunde';
import { Zertifikat } from '../models/zertifikat';

@Injectable({
  providedIn: 'root',
})
export class KundeService {

  constructor(private httpClient: HttpClient) {}

  createKunde(kunde: Kunde): Observable<any> {
    return this.httpClient.post(environment.apiUrl + '/createKunde', kunde)
      .pipe(catchError(error => this.handleError(error)));
  }

  getKunden(): Observable<any> {
    return this.httpClient.get(environment.apiUrl + '/getKunden')
      .pipe(catchError(error => this.handleError(error)));
  }

  deleteKunde(id: number): Observable<any> {
    return this.httpClient.get(environment.apiUrl + '/deleteKunde/' + id)
      .pipe(catchError(error => this.handleError(error)));
  }

  printZertifikat(zertifikat: Zertifikat): Observable<any> {
    return this.httpClient.post(environment.apiUrl + '/pdf/zertifikat', zertifikat)
      .pipe(catchError(error => this.handleError(error)));
  }

  private handleError(_error: HttpErrorResponse) {
    return throwError(() => new Error('Ein Fehler ist aufgetreten. Bitte melden Sie sich beim Testzentrum.'));
  }
}
