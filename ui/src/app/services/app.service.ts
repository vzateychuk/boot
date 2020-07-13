import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  authenticated = false;
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {}

  authenticate(credentials, callback) {

    const headers = new HttpHeaders(
      credentials 
        ? { authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password) } 
        : {}
      );

    this.http.get(this.apiUrl + '/user', {headers: headers})
      .subscribe( response => {
        if (response['name']) {
            this.authenticated = true;
        } else {
            this.authenticated = false;
        }
        return callback && callback();
    });
  }

}
