import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CredentialsInterceptor implements HttpInterceptor {

    constructor(private tokenExtractor: HttpXsrfTokenExtractor) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const headerName = 'XSRF-TOKEN';
        const token = this.tokenExtractor.getToken() as string;
        if (token !== null && !req.headers.has(headerName)) {
            const respHeaderName = 'X-XSRF-TOKEN';
            const csrfHeaderName = 'X-CSRF-TOKEN';

            req = req.clone({ headers: req.headers.set(respHeaderName, token).set(csrfHeaderName, token) });
        }
        // Always set withCredentials
        req = req.clone({ withCredentials: true });

        return next.handle(req);
    }
}
