import { Component, OnInit } from '@angular/core';
import { PassBetweenComponService } from './PassBetweenComponService';
import { tokenGetter } from './app.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  isLogged = false;

  constructor(private data: PassBetweenComponService) {
    this.data.currentLoginState.subscribe(isLoggex => this.isLogged = isLoggex);
  }

  ngOnInit(  ) {
    const getToken = localStorage.getItem("jwt");
    if(getToken){
      this.isLogged = true;
      this.data.sendLoginState(this.isLogged);
    }
  }
}
