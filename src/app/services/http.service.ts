import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {observable, Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError, retry} from 'rxjs/operators';
import {Aircraft} from "../model/aircraft";
import {environment} from "../../environments/environment";
import {Person} from "../model/person";

@Injectable()
export class HttpService {
  private readonly token!: string | null;
  private readonly headers = {};
  private readonly fileUploadHeaders = {};
  retry = 1;

  constructor(private http: HttpClient) {
    const csrf = document.head.querySelector('meta[name=\'_csrf\']');
    if (csrf !== null) {
      this.token = csrf.getAttribute('content');
      this.headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-TOKEN': this.token,
      };
    }
  }

  setImpersonationHeader() {
    /*if (localStorage.getItem('login') !== null) {
        const login = JSON.parse(localStorage.getItem('login'));

        if (environment.impersonation.active && login.admin) {
            let impersonate = localStorage.getItem('impersonate');

            if (!impersonate) {
                impersonate = environment.impersonation.userId;
            }

            this.headers['x-impersonate'] = impersonate;
            this.fileUploadHeaders['x-impersonate'] = impersonate;
        }
    }*/
  }

  getAircraft(): Observable<Array<Aircraft>> {
    return this.getData(`${environment.apiServer}${environment.app}${environment.endpoint}/aircraft/`);
  }

  getPeople(): Observable<Array<Person>> {
    return this.getData(`${environment.apiServer}${environment.app}${environment.endpoint}/people/`);
  }

  getData(url: string): Observable<any> {
    this.setImpersonationHeader();
    return this.http.get(url, {withCredentials: false, headers: this.headers}).pipe(
      retry(this.retry),
      catchError(this.handleError)
    );
  }

  getAirportInfo(airportCode: string): Observable<any> {
    const headers = {
      'X-RapidAPI-Key': '0a12d6ec6emsh0f3bd2565f4656bp1ad243jsnd2231800c67c',
      'X-RapidAPI-Host': 'airport-info.p.rapidapi.com'
    };
    return this.http.get(`https://airport-info.p.rapidapi.com/airport?icao=${airportCode}`, {
      withCredentials: false,
      headers
    }).pipe(
      retry(this.retry),
      catchError(this.handleError)
    );
  }

  deleteData(url: string): Observable<any> {
    this.setImpersonationHeader();
    return this.http.delete(url, {withCredentials: false, headers: this.headers}).pipe(
      retry(this.retry),
      catchError(this.handleError)
    );
  }

  postData(url: string, data: any): Observable<any> {
    this.setImpersonationHeader();
    return this.http.post(url, data, {
      headers: this.headers,
      withCredentials: false,
      responseType: 'text' as const
    }).pipe(
      catchError(this.handleError)
    );
  }

  update(url: string, data: any): Observable<any> {
    this.setImpersonationHeader();
    return this.http.put(url, data, {headers: this.headers, withCredentials: false}).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
