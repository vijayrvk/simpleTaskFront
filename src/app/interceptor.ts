import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse,HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import {UtilService} from './services/util.service';


@Injectable()
export class Interceptor implements HttpInterceptor{

    token : any= '';

    constructor(private router:Router,public util: UtilService) { }
    
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

		if(localStorage.getItem('token') != "") {
            this.token = this.util.getText('token');
		} if(this.token) {
			req = req.clone({ 
				headers: req.headers.set("x-auth-token", this.token)
            });
		}

		return next.handle(req)
            .do((event: HttpEvent<any>) => {                
            }, (err: any) => {
				if (err instanceof HttpErrorResponse) {
					if (err.status === 403 ) {
						localStorage.clear();
						this.router.navigate(['login']);
					}
				}
            });
	}
}
