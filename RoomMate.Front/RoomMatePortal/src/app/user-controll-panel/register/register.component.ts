import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import {RegisterDto} from './dto/register-dto';
import { MatDialogRef } from '@angular/material';
import { UserManagementService } from "../user-management.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RolesEnum } from '../dto/RolesEnum';

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

    //here working wirh enum:
    keys = Object.keys; //key has name as label and symbol as value
    roles = RolesEnum;


  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', {validators: [Validators.required, Validators.minLength(2)]}),
      surname: new FormControl('', {validators: [Validators.required, Validators.minLength(2)]}),
      email: new FormControl('', {validators: [Validators.required, Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]}),
      login: new FormControl('', {validators: [Validators.required, Validators.pattern('[A-Za-z0-9_]*'), Validators.minLength(2)]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(6)]}),
      role: new FormControl(RolesEnum.Flatmate),
      });
  }


  closeModal(): void {
    this.dialogRef.close();
  }

   // convenience getter for easy access to form fields
   get f() { return this.form.controls; }

  register() {
    this.registerDto.name = this.form.value.name;
    this.registerDto.surname = this.form.value.surname;
    this.registerDto.email = this.form.value.email;
    this.registerDto.login = this.form.value.login;
    this.registerDto.password = this.form.value.password;
    debugger;
    this.onChange(event);
    debugger;
    let xd = this.registerDto;
    this.registerService.register(this.registerDto).subscribe(response => {
      if (response) {
        debugger;
        this.isRegistered = true;
        this.registerEvent.emit(this.isRegistered);
        this.closeModal();
      }
      else {
        // debugger;
        this.isRegistered = false;
        this.registerEvent.emit(this.isRegistered);
      }
    },
    error => {
      this.errorShow = true;
    });
  }

  onChange($event): void {
    debugger;
    let newVar = $event.target.value;
    this.registerDto.role = newVar;
  }

}
