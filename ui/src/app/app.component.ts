import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppService } from './services';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {

  constructor(
    private app: AppService,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    /* 
    Called when the controller is loaded to see if the user is actually already authenticated
     (e.g. if he had refreshed the browser in the middle of a session).
    We need the authenticate() function to make a remote call because the actual authentication is done by the server,
     and we don’t want to trust the browser to keep track of it.
    */
    this.app.authenticate(undefined, undefined);
  }

  logout() {
    this.http.post('logout', {}).subscribe(() => {
      this.app.authenticated = false;
      this.router.navigateByUrl("/login");
    });
  }
}
