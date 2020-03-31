import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { AddHouseworkModalComponent } from '../housework/modal/add-housework-modal/add-housework-modal.component';
import { MatDialog } from '@angular/material';
import { PassBetweenComponService } from '../PassBetweenComponService';
import { FlatAddressService } from '../address/flat-address.service';
import { AddressFlatDto } from '../address/dto/address-dto';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public dialog: MatDialog,
  public flatAddressService: FlatAddressService) {}
  userName: string;
  flatAddressDto: AddressFlatDto[];
  flatID: number;
  buttonDisabled: boolean = true;


  ngOnInit()  {
    this.userName = JSON.parse(localStorage.getItem("login"));
    this.flatAddressService.getAllFlats(this.userName).subscribe( response => {
      if (response.length > 0 && response[0].id !== 0) {
         this.flatAddressDto = response;
      }
    });

  }

  // selected dropdown
  onSelectedOption(event): void {
    this.flatID = event.value;
    if (this.flatID) {
      this.buttonDisabled = false;
    } else {
      this.buttonDisabled = true;
    }
  }


  public showModalToAdd() {
    // here selected flat data goes to addhousework as flatID
    const dialogRef = this.dialog.open(AddHouseworkModalComponent, {
      width: '450px',
      // pass only one id
      data: {
        flatAddressDto: this.flatAddressDto
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
