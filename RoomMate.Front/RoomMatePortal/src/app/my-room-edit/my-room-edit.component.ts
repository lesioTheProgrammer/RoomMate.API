import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material';
import { AddressFlatDto } from '../address/dto/address-dto';
import { FlatAddressService } from '../address/flat-address.service';

@Component({
  selector: 'app-my-room-edit',
  templateUrl: './my-room-edit.component.html',
  styleUrls: ['./my-room-edit.component.css']
})
export class MyRoomEditComponent implements OnInit {

  errorShow: false;
  flatEditDetails: AddressFlatDto = new AddressFlatDto;
  userName: string;

  @Output() updateDetails = new EventEmitter();

  constructor(
    public dialogRef: MatDialogRef<MyRoomEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public flatAddressService: FlatAddressService,
    private _snackBar: MatSnackBar
  ) { }

  form: FormGroup;
  ngOnInit() {
    this.form = new FormGroup({
      flatName: new FormControl('', {
        validators: [Validators.required]
      }),
      area: new FormControl('', {
        validators: [Validators.required, Validators.min(1)]
      }),
      roomCount: new FormControl('', {
        validators: [Validators.required, Validators.min(1)]
      })
    });

  }



  get f () {
    return this.form.controls;
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  edit() {
    // method to get edit details etc pass it to service
    this.flatEditDetails.flatName = this.form.value.flatName;
    this.flatEditDetails.area = this.form.value.area;
    this.flatEditDetails.roomCount = this.form.value.roomCount;
    this.flatEditDetails.id = this.data.flatId;
    this.flatEditDetails.loggedUserName = this.data.userName;
    this.flatEditDetails.active = this.data.active;
    this.flatEditDetails.roleType = this.data.roleType;
    this.flatAddressService.editTheFlat(this.flatEditDetails)
    .subscribe(response => {
      if (response) {
        // refresh and close modal
        this.closeModal();
        this.updateDetails.emit();

      } else {
        // snackbar with notification that something went wrong
        this.openSnackBar('Edit action has failed', 'Ok');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
}
