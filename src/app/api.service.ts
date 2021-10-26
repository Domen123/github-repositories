import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  GITHUB_URL:string = "https://api.github.com/";
  constructor( private http: HttpClient ) { }
  public generateGetRequest(url: string, customheaders: {} = {}, params: {} = {}) {
    let headers = {
        ...customheaders
    };

    const httpOptions = {
      headers: new HttpHeaders(headers),
      params: params
    };

    return this.http.get(url, httpOptions)
    .pipe(
      map(data => {
        return data;
      }),
      catchError(
        (this.handleError)
        )
    );
  }

  private handleError(error){
    if (error.status === 403) {
      try{
        let w = window as any;
        w.Intercom('shutdown');
      } catch(err){ console.log(err); }
      
    }
    return throwError(error.message);
 }    

  public getUserDetails(userID) {
    const headers = {
      'Content-Type':  'application/json'
    };
    return this.generateGetRequest(`${this.GITHUB_URL}users/${userID}`, headers);
  }

  public getUserRepos(userID,page,items_per_page) {
    const headers = {
      'Content-Type':  'application/json'
    };
    return this.generateGetRequest(`${this.GITHUB_URL}users/${userID}/repos?page=${page}&per_page=${items_per_page}`, headers);
  }
}
