import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PassBetweenComponService } from '../PassBetweenComponService';

@Component({
  selector: 'app-user-controll-panel',
  templateUrl: './user-controll-panel.component.html',
  styleUrls: ['./user-controll-panel.component.css']
})
export class UserControllPanelComponent implements OnInit {
  isLoggex: boolean = false;
  isRegistered: boolean = false;
  isLoginNamex: string = '';


  constructor(public dialog: MatDialog, private data: PassBetweenComponService) {}

  ngOnInit(  ) {
    this.data.currentLoginState.subscribe(isLoggex => this.isLoggex = isLoggex);
    // this.data.currenLoginName.subscribe(isLoginNamex => this.isLoginNamex = isLoginNamex);
  }

  public showLoginField() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '1000px'
    });
    dialogRef.componentInstance.loginEvent.subscribe(result => {
      debugger;
      this.isLoggex = result;
      //ten subskrajb ustawia wartosc islogges (currentLoginState) na result??
      this.data.sendLoginState(this.isLoggex);


      // this.data.sendLoginName(this.isLoginNamex);
    });
    console.log('The dialog was closed');
  }
  public showRegisterField() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '1000px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isRegistered = result;
      console.log('The dialog was closed');
    });
  }
}


