import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Injectable} from '@angular/core';
import {catchError, retry} from 'rxjs/operators';

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

  getData(url: string): Observable<any> {
    this.setImpersonationHeader();
    return this.http.get(url, {withCredentials: false, headers: this.headers}).pipe(
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
