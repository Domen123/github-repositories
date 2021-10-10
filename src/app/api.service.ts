import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  GITHUB_URL:string = "https://api.github.com/";
  constructor(private http: HttpClient) { }

 

  public generateRequest(type: string, url: string, payload: any = {}, customheaders: any = {}, params: any = {}) {
    
    let headers = {
        ...customheaders
    };

    const httpOptions = {
      headers: new HttpHeaders(headers),
      params: params
    };

    if (type === "POST") {
      return this.http.post(url, payload, httpOptions)
        .pipe(
          map(data => {
            return data;
          }),
          catchError(
            this.handleError([]))
        ).toPromise();
    } else {
      return this.http.get(url, httpOptions)
      .pipe(
        map(data => {
          return data;
        }),
        catchError(
          this.handleError([]))
      ).toPromise();
    }
  }

  private handleError<T> (result?: T) {
    return (error: any): Observable<T> => {
      // forbidden
      if (error.status === 403) {
      
        
        try{
          let w = window as any;
          w.Intercom('shutdown');
        } catch(err){ console.log(err); }

        setTimeout(() => {
          location.reload();
        }, 1000);
      }

      throw error;
    };
  }

  public getUserDetails(userID) {
    const headers = {
      'Content-Type':  'application/json'
    };
    return this.generateRequest('GET', this.GITHUB_URL + `users/${userID}`, headers);
  }

  public getUserRepos(userID,page,items_per_page) {
    const headers = {
      'Content-Type':  'application/json'
    };
    return this.generateRequest('GET', this.GITHUB_URL + `users/${userID}/repos?page=${page}&per_page=${items_per_page}`, headers);
  }



}
