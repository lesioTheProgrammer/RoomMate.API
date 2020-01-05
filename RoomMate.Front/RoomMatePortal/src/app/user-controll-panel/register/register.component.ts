import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import {RegisterDto} from './dto/register-dto';
import { MatDialogRef } from '@angular/material';
import { UserManagementService } from "../user-management.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //properties
  errorShow: boolean = false;
  dataLoaded: boolean = false;
  isRegistered: boolean = false;
  registerDto: RegisterDto = new RegisterDto();

  @Output() registerEvent = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    //injecting services
    public registerService: UserManagementService,
    //no cookies
  ) { }

  ngOnInit() {
  }
  closeModal(): void {
    this.dialogRef.close();
  }
  register(){
    this.registerService.register(this.registerDto).subscribe(response => {
      if (response) {
        this.isRegistered = true;
        this.registerEvent.emit(this.isRegistered);

        this.closeModal();
      }
    },
    error => {
      this.errorShow = true;
    });
  }
}
