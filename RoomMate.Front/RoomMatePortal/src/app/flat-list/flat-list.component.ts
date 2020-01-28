import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from "@angular/core";
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
  joinedFlat: boolean = false;


  @Input() flatDetails: AddressDto;
  @Input() userExistInList: boolean;
  constructor(
    private _snackBar: MatSnackBar,
    public flatAddressService: FlatAddressService
  ) {}


  @Output() updateList = new EventEmitter();

  ngOnInit() {
  }

  flatAdd() {


  }

  joinTheFlat() {
    if (this.userExistInList) {
      this.openSnackBar('You cant enter the flat becasue you are already inside!', 'Ok');
    } else {
      this.flatAddressService.assignUserToFlat(this.flatDetails)
        .subscribe(response => {
          if (response) {
            this.openSnackBar('You entered the flat', 'Ok');
            this.joinedFlat = true;
            this.updateList.emit();
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

  leaveTheFlat() {
    if (this.userExistInList) {
     this.flatAddressService.leaveflat(this.flatDetails)
     .subscribe(response => {
       if (response) {
         this.openSnackBar('You have left the flat', 'Ok');
         this.joinedFlat = false;
         this.updateList.emit();
       } else {
        this.openSnackBar('Something went wrong', 'Ok');
       }
     });
    }
  }
}
