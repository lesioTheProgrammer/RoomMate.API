import { Component, OnInit, Input, SimpleChanges, Output, EventEmitter, ViewChild } from "@angular/core";
import { AddressFlatDto } from "../address/dto/address-dto";
import { FlatAddressService } from "../address/flat-address.service";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { RolesEnum } from "../user-controll-panel/dto/RolesEnum";
import { MatSnackBar } from "@angular/material";

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
  @Input() flatDetailsFromMyRoomComponent: AddressFlatDto;
  constructor(
    public flatAddressService: FlatAddressService,
    private _snackBar: MatSnackBar

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

  get f() {
    return this.form.controls;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  addTheFlat() {
    this.joinedFlat = false;
    this.flatExtraDetails = true;
    this.flatDetails.roleType = RolesEnum.FlatMateAdmin;
    this.flatDetails.flatName = this.form.value.flatName;
    this.flatDetails.area = this.form.value.area;
    this.flatDetails.roomCount = this.form.value.roomCount;
    this.flatAddressService.addTheFlat(this.flatDetails)
    .subscribe(response => {
      if (response.addressId !== 0) {
        response.loggedUserName = response.users[0].login;
        this.joinedFlat = true;
        this.flatExtraDetails = false;
        this.updateList.emit();
        this.flatDetails = response;
        this.openSnackBar('You entered the flat', 'Ok');
      }
    });
  }

  joinTheFlat() {
    if (this.userExistInList) {
      this.openSnackBar('You cant enter the flat becasue you are already inside!', 'Ok');
    } else {
      if (this.flatDetails.users.length > 0) {
        this.flatDetails.roleType = RolesEnum.Flatmate;
      } else {
        this.flatDetails.roleType = RolesEnum.FlatMateAdmin;
      }
      this.flatAddressService.assignUserToFlat(this.flatDetails)
        .subscribe(response => {
          if (response) {
            this.joinedFlat = true;
            this.updateList.emit();
            this.openSnackBar('You have left the flat', 'Ok');
          } else {
            this.openSnackBar('Something went wrong', 'Ok');
          }
        });
    }
  }

  leaveTheFlat() {
    this.joinedFlat = false;
    if (this.userExistInList) {
     this.flatAddressService.leaveflat(this.flatDetails)
     .subscribe(response => {
       if (response) {
         this.userExistInList = false;
         this.joinedFlat = false;
         this.updateList.emit();
         this.openSnackBar('You have left the flat', 'Ok');
       } else {
        this.openSnackBar('Something went wrong', 'Ok');
       }
     });
    }
  }
}
