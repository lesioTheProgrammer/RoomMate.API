import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { RegisterDto } from "./dto/register-dto";
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { UserManagementService } from "../user-management.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { RolesEnum } from "../dto/RolesEnum";
import { Observable } from "rxjs";
import { startWith, map, debounceTime } from "rxjs/operators";
import { CityDto } from "src/app/address/dto/city-dto";
import { AddressDto } from "src/app/address/dto/address-dto";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  //properties
  disabledButton = false;
  errorShow: boolean = false;
 // dataLoaded: boolean = false;
  isRegistered: boolean = true;
  registerDto: RegisterDto = new RegisterDto();
  form: FormGroup;
  registerVariable: any;
  pusheditems: CityDto[] = []; // empty arr
  citiesFromApi: Observable<CityDto[]>;
  cityName: string;
  autoComplForm: FormControl = new FormControl();
  // here working wirh enum:
  keys = Object.keys; // key has name as label and symbol as value
  roles = RolesEnum;

  cityGetSuccess: boolean = false;

  addressFromApi: Observable<AddressDto[]>;
  pushedAddrItems: AddressDto[] = []; // empty arr
  addresCtrl: FormControl;


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
      roletype: new FormControl(RolesEnum.Flatmate)
    });



    this.citiesFromApi = this.autoComplForm.valueChanges.pipe(
      startWith(''),
      map(letters => (letters.length >= 2 ? this.getCities(letters) : []))
    );

    this.addresCtrl = new FormControl();
    this.addressFromApi = this.addresCtrl.valueChanges.pipe(
      startWith(''),
      map(streetLetters => (streetLetters.length >= 2 && this.cityGetSuccess ? this.getAddress(streetLetters) : []))
    );
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
    this.registerDto.roletype = this.registerVariable;

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

  onChange(event: any) {
    this.registerVariable = event.target.value;
    this.registerDto.roletype = this.registerVariable;
  }

  getCities(letters: string): CityDto[] {
    /// Pierwsze co to wykona się to o:
    this.pusheditems = new Array<CityDto>();
    this.registerService.getCityByTwoLetters(letters).subscribe(response => {
      if (response != null) {
        response.forEach(element => {
          let newcity = new CityDto();
          newcity.cityId = element.cityId;
          newcity.cityName = element.cityName;
          this.pusheditems.push(newcity);
        });
      }
    });
    return this.pusheditems;
  }

  // metoda wywolywana jak bede wpisywac city
  getAddress(streetLetters: string): AddressDto[] {
    this.pushedAddrItems = new Array<AddressDto>();

    this.registerService.getAddressByCityIdStreet(this.registerDto.cityId, streetLetters)
    .subscribe(response => {
      if (response != null) {
        response.forEach(element => {
          let newAddress = new AddressDto();
          newAddress.cityId = element.cityId;
          newAddress.cityName = element.cityName;
          newAddress.flatNumber = element.flatNumber;
          newAddress.houseNumber = element.houseNumber;
          newAddress.street = element.street;
          this.pushedAddrItems.push(newAddress);
        });
      }
    });
    return this.pushedAddrItems;
  }

  passCitytoAddr(cityId: number) {
    this.registerDto.cityId = cityId;
    this.cityGetSuccess = true;
  }



  //post request do bazy z tym adresem co wybral


}
