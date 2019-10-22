import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  serverUrl = 'http://localhost:3214/';
  // serverUrl = 'http://18.222.218.72:3214/';
  imageUrl = 'http://18.222.218.72:3214/images/';


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getApi(url: any) {
    return this.http.get<any[]>(this.serverUrl + url).pipe(
      catchError(this.handleError)
    );
  }

  postApi(json: any, url) {
    return this.http.post<any>(this.serverUrl + url, json, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  putApi(json: any, url) {
    return this.http.put<any>(this.serverUrl + url, json, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error({error});
    let errorMessage = {};
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = {message: error.error.message};
    } else {
      // server-side error
      errorMessage = {code: error.status, message: error.error.message};
    }
    return throwError(errorMessage);
  }

}
