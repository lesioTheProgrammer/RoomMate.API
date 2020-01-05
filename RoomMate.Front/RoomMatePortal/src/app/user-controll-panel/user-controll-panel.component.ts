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
  isLoggex = false;
  isRegistered = false;
  isLoginNamex = '';

  constructor(public dialog: MatDialog, private data: PassBetweenComponService) {}

  ngOnInit(  ) {
    this.data.currentLoginState.subscribe(isLoggex => this.isLoggex = isLoggex);
  }

  public showLoginField() {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: '1000px'
    });

    dialogRef.componentInstance.loginEvent.subscribe(result => {
      this.isLoggex = result;
      this.data.sendLoginState(this.isLoggex);
    });

  }
  public showRegisterField() {
    const dialogRef = this.dialog.open(RegisterComponent, {
      width: '1000px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.isRegistered = result;
    });
  }
}


