import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { AddHouseworkModalComponent } from '../housework/modal/add-housework-modal/add-housework-modal.component';
import { MatDialog } from '@angular/material';
import { PassBetweenComponService } from '../PassBetweenComponService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public dialog: MatDialog, private data: PassBetweenComponService) {}

  ngOnInit()  {

  }

  public showModalToAdd() {
    const dialogRef = this.dialog.open(AddHouseworkModalComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
