import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import {RegisterDto} from './dto/register-dto';
import { MatDialogRef } from '@angular/material';
import { UserManagementService } from "../user-management.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //properties
  errorShow: boolean = false;
  dataLoaded: boolean = false;
  isRegistered: boolean = true;
  registerDto: RegisterDto = new RegisterDto();
  form: FormGroup;

  @Output() registerEvent = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    //injecting services
    public registerService: UserManagementService,
    //no cookies
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', {validators: [Validators.required, Validators.minLength(2)]}),
      surname: new FormControl('', {validators: [Validators.required, Validators.minLength(2)]}),
      email: new FormControl('', {validators: [Validators.required, Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]}),
      login: new FormControl('', {validators: [Validators.required, Validators.pattern('[A-Za-z0-9_]*'), Validators.minLength(2)]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(6)]}),
      })
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  register() {
    this.registerService.register(this.registerDto).subscribe(response => {
      if (response) {
        this.isRegistered = true;
        this.registerEvent.emit(this.isRegistered);
        this.closeModal();
      }
      else {
        this.isRegistered = false;
        this.registerEvent.emit(this.isRegistered);
      }
    },
    error => {
      this.errorShow = true;
    });
  }
}

//pspspsp
