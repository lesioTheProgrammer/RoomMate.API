import { Component, OnInit,  Output, EventEmitter } from '@angular/core';
import {RegisterDto} from './dto/register-dto';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { UserManagementService } from "../user-management.service";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RolesEnum } from '../dto/RolesEnum';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CityDto } from 'src/app/address/dto/city-dto';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //properties
  disabledButton = false;
  errorShow: boolean = false;
  dataLoaded: boolean = false;
  isRegistered: boolean = true;
  registerDto: RegisterDto = new RegisterDto();
  form: FormGroup;
  registerVariable: any;

  options = [
    'One',
    'Two',
    'Three'
  ];

  arrCities: string [] = [];

  citiesFromApi: Observable<string[]>;

  @Output() registerEvent = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<RegisterComponent>,
    public registerService: UserManagementService,
    private _snackBar: MatSnackBar,
  ) { }

    //here working wirh enum:
    keys = Object.keys; //key has name as label and symbol as value
    roles = RolesEnum;

    autoComplForm: FormControl = new FormControl();



  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', {validators: [Validators.required, Validators.minLength(2)]}),
      surname: new FormControl('', {validators: [Validators.required, Validators.minLength(2)]}),
      email: new FormControl('', {validators: [Validators.required, Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]}),
      login: new FormControl('', {validators: [Validators.required, Validators.pattern('[A-Za-z0-9_]*'), Validators.minLength(2)]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(6)]}),
      roletype: new FormControl(RolesEnum.Flatmate)
      });



      this.citiesFromApi = this.autoComplForm.valueChanges
      .pipe(
        startWith(''),
        map(letters => letters.length >= 2 ? this.getCities(letters) : [])
      );
  }

//filter nie trzeba bo api filtruje
  filter(val: string): string[] {
    return this.options.filter(option =>
      option.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }




  closeModal(): void {
    this.dialogRef.close();
  }

   // convenience getter for easy access to form fields
   get f() { return this.form.controls; }

  register() {
    this.disabledButton = true;
    this.registerDto.name = this.form.value.name;
    this.registerDto.surname = this.form.value.surname;
    this.registerDto.email = this.form.value.email;
    this.registerDto.login = this.form.value.login;
    this.registerDto.password = this.form.value.password;
    this.registerDto.roletype = this.registerVariable;
    this.registerService.register(this.registerDto).subscribe(response => {
      if (response) {
        this.isRegistered = true;
        this.registerEvent.emit(this.isRegistered);
        this.openSnackBar('Register success', 'Ok');
        this.closeModal();
      }
      else {
        this.isRegistered = false;
        this.registerEvent.emit(this.isRegistered);

        this.openSnackBar('Register fail', 'Ok');
      }
      this.disabledButton = false;
    },
    error => {
      this.errorShow = true;
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


  onChange(event: any) {
    this.registerVariable = event.target.value;
    this.registerDto.roletype = this.registerVariable;
  }


  getCities(letters: string): string[] {
    this.registerService.getCityByTwoLetters(letters)
      .subscribe(response => {
        if (response != null){
          response.forEach(element => {
            this.arrCities.push(element.cityName);
          });
        }
      });
      return this.arrCities;
  }


}







