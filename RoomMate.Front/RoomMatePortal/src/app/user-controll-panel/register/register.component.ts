import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { RegisterDto } from "./dto/register-dto";
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { UserManagementService } from "../user-management.service";
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
import { RolesEnum } from "../dto/RolesEnum";
import { Observable } from "rxjs";
import { startWith, map, debounceTime } from "rxjs/operators";
import { CityDto } from "src/app/address/dto/city-dto";
import { AddressFlatDto } from "src/app/address/dto/address-dto";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  //properties
  disabledButton = false;
  errorShow: boolean = false;
  isRegistered: boolean = true;
  registerDto: RegisterDto = new RegisterDto();
  form: FormGroup;
  registerVariable: any;

  @Output() registerEvent = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    public registerService: UserManagementService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      surname: new FormControl('', {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      email: new FormControl('', {
        validators: [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
        ]
      }),
      login: new FormControl('', {
        validators: [
          Validators.required,
          Validators.pattern('[A-Za-z0-9_]*'),
          Validators.minLength(2)
        ]
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)]
      }),
    });
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  register() {
    this.disabledButton = true;
    this.registerDto.name = this.form.value.name;
    this.registerDto.surname = this.form.value.surname;
    this.registerDto.email = this.form.value.email;
    this.registerDto.login = this.form.value.login;
    this.registerDto.password = this.form.value.password;

    this.registerService.register(this.registerDto).subscribe(
      response => {
        if (response) {
          this.isRegistered = true;
          this.registerEvent.emit(this.isRegistered);
          this.openSnackBar('Register success', 'Ok');
          this.closeModal();
        } else {
          this.isRegistered = false;
          this.registerEvent.emit(this.isRegistered);
          this.openSnackBar('Register failure', 'Ok');
        }
        this.disabledButton = false;
      },
      error => {
        this.errorShow = true;
      }
    );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }
}
