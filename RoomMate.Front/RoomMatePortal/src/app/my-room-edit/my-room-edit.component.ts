import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-my-room-edit',
  templateUrl: './my-room-edit.component.html',
  styleUrls: ['./my-room-edit.component.css']
})
export class MyRoomEditComponent implements OnInit {

  errorShow: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<MyRoomEditComponent>,

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

  }

}
