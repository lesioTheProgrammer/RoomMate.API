import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
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

  errorShow: boolean = false;
  flatEditDetails: AddressFlatDto = new AddressFlatDto;
  userName: string;

  constructor(
    public dialogRef: MatDialogRef<MyRoomEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public flatAddressService: FlatAddressService,
  ) { }

  form: FormGroup;
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
    //sub
    this.flatAddressService.editTheFlat(this.flatEditDetails)
    .subscribe(response => {
      if (response) {
        let xd = ""
        debugger;
      }
      else {
        let xd = ""
        debugger;
      }
    });
  }
}
