import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/services';
import { HttpClient } from '@angular/common/http';
import { Greeting } from 'src/app/greeting';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Demo';
  greeting: Greeting = {id: '', content: ''};

  constructor(
    private app: AppService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.http.get('resource').subscribe((data: Greeting) => this.greeting = data);
  }

  authenticated() {
    return this.app.authenticated;
  }
}
