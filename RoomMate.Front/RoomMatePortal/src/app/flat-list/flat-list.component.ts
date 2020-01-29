import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter } from "@angular/core";
import { AddressFlatDto } from "../address/dto/address-dto";
import { MatSnackBar } from "@angular/material";
import { FlatAddressService } from "../address/flat-address.service";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { RolesEnum } from "../user-controll-panel/dto/RolesEnum";

@Component({
  selector: "app-flat-list",
  templateUrl: "./flat-list.component.html",
  styleUrls: ["./flat-list.component.css"]
})
export class FlatListComponent implements OnInit {

  loginCurrentUser: string;
  joinedFlat: boolean = false;
  flatExtraDetails: boolean = false;

  form: FormGroup;

  @Input() flatDetails: AddressFlatDto;
  @Input() userExistInList: boolean;
  constructor(
    private _snackBar: MatSnackBar,
    public flatAddressService: FlatAddressService
  ) {}


  @Output() updateList = new EventEmitter();

  ngOnInit() {
    this.form = new FormGroup({
      flatName: new FormControl('', {
        validators: [Validators.required]
      }),
      area: new FormControl('', {
        validators: [Validators.required]
      }),
      roomCount: new FormControl('', {
        validators: [Validators.required]
      })
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  get f(){
    return this.form.controls;
  }

  addTheFlat() {
    // user have to insert all details required
    // move the button
    this.flatExtraDetails = true;
    this.flatDetails.roleType = RolesEnum.FlatMateAdmin;
    this.flatDetails.flatName = this.form.value.flatName;
    this.flatDetails.area = this.form.value.area;
    this.flatDetails.roomCount = this.form.value.roomCount;
    this.flatAddressService.addTheFlat(this.flatDetails)
    .subscribe(response => {
      if (response.addressId !== 0) {
        response.loggedUserName = response.users[0].login;
        this.flatExtraDetails = false;
        this.userExistInList = true;
        this.flatDetails = response;
      }
    });
  }

  joinTheFlat() {
    if (this.userExistInList) {
      this.openSnackBar('You cant enter the flat becasue you are already inside!', 'Ok');
    } else {
      this.flatDetails.roleType = RolesEnum.Flatmate;
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



  leaveTheFlat() {
    if (this.userExistInList) {
     this.flatAddressService.leaveflat(this.flatDetails)
     .subscribe(response => {
       if (response) {
         this.userExistInList = false;
         this.openSnackBar('You have left the flat', 'Ok');
         this.joinedFlat = false;
         debugger;
         this.updateList.emit();
       } else {
        this.openSnackBar('Something went wrong', 'Ok');
       }
     });
    }
  }
}
