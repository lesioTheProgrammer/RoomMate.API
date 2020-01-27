import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { AddressDto } from "../address/dto/address-dto";
import { MatSnackBar } from "@angular/material";
import { FlatAddressService } from "../address/flat-address.service";

@Component({
  selector: "app-flat-list",
  templateUrl: "./flat-list.component.html",
  styleUrls: ["./flat-list.component.css"]
})
export class FlatListComponent implements OnInit {

  loginCurrentUser: string;
  userExistInList: boolean = false;


  @Input() flatDetails: AddressDto;
  constructor(
    private _snackBar: MatSnackBar,
    public flatAddressService: FlatAddressService
  ) {}

  ngOnInit() {
    this.loginCurrentUser = JSON.parse(localStorage.getItem("login"));
  }

  flatAdd() {


  }

  joinTheFlat() {
    this.flatDetails.users.forEach(element => {
        if (element.login.toLowerCase() === this.loginCurrentUser.toLowerCase() && !this.userExistInList) {
          this.userExistInList = true;
        }
    });

    if (this.userExistInList) {
      this.openSnackBar('You cant enter the flat becasue you are already inside!', 'Ok');
    } else {
      this.flatDetails.loggedUserName = this.loginCurrentUser.toLowerCase();
      this.flatAddressService.assignUserToFlat(this.flatDetails)
        .subscribe(response => {
          if (response) {
            this.openSnackBar('You entered the flat', 'Ok');
          } else {
            this.openSnackBar('Something went wrong', 'Ok');
          }
        });

    }

  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

}
