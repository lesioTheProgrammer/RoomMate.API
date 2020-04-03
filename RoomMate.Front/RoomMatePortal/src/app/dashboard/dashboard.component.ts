import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { AddHouseworkModalComponent } from '../housework/modal/add-housework-modal/add-housework-modal.component';
import { MatDialog } from '@angular/material';
import { PassBetweenComponService } from '../PassBetweenComponService';
import { FlatAddressService } from '../address/flat-address.service';
import { AddressFlatDto } from '../address/dto/address-dto';
import { HouseworkComponent } from '../housework/housework.component';
import { ShoppingComponent } from '../shopping/shopping.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public dialog: MatDialog,
  public flatAddressService: FlatAddressService) {}
  login: string;
  flatAddressDto: AddressFlatDto[];
  flatID: number;
  buttonDisabled: boolean = true;

  @ViewChild(HouseworkComponent) houseWorkTableChild: HouseworkComponent;
  @ViewChild(ShoppingComponent) shoppingTableChild: ShoppingComponent;

  ngOnInit()  {
    this.login = JSON.parse(localStorage.getItem("login"));
    this.flatAddressService.getAllFlats(this.login).subscribe( response => {
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
      // pass data to housework component and shopping
      this.houseWorkTableChild.refreshFlatList(this.flatID, this.login);
      this.shoppingTableChild.refreshFlatList(this.flatID);

    } else {
      this.buttonDisabled = true;
    }
  }


  public showModalToAdd() {
    const dialogRef = this.dialog.open(AddHouseworkModalComponent, {
      width: '450px',
      data: {
        flatID: this.flatID
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
