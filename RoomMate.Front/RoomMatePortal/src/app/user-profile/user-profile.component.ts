import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RemoveAccountComponent } from './remove-account/remove-account.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  public showInfoAboutRemovedAccount() {
    const dialogRef = this.dialog.open(RemoveAccountComponent, {
      width: '400px',
      height: '200px'
    });
  }
}
