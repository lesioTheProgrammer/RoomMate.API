import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { RegisterDto } from "./dto/register-dto";
import { MatDialogRef, MatSnackBar } from "@angular/material";
import { UserManagementService } from "../user-management.service";
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from "@angular/forms";
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
  isRegistered: boolean = true;
  registerDto: RegisterDto = new RegisterDto();
  form: FormGroup;
  registerVariable: any;
  pusheditems: CityDto[] = []; // empty arr
  citiesList: Observable<CityDto[]>;
  cityName: string;
  cityCtrl: FormControl = new FormControl();
  roles = RolesEnum;
  cityGetSuccess: boolean = false;
  addressesList: Observable<AddressDto[]>;
  pushedAddrItems: AddressDto[] = []; // empty arr
  addresCtrl: FormControl;
  addrSelectSuccess: boolean = false;

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
    this.citiesList = this.cityCtrl.valueChanges.pipe(
      startWith(''),
      map(letters => (letters.length >= 2 ? this.getCities(letters) : []))
    );
    this.addresCtrl = new FormControl();
    this.addressesList = this.addresCtrl.valueChanges.pipe(
      startWith(''),
      map(streetLetters => (streetLetters.length >= 2 && this.cityGetSuccess ? this.getAddress(streetLetters) : []))
    );
    this.cityCtrl.setValidators(forbiddenNamesValidator(this.pusheditems));
    // on init ends here
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }

  register() {
    this.selectRole(this.addrSelectSuccess);
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
  getCities(letters: string): CityDto[] {
    /// First that will execute new empty list:
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
  // method called when user selects the city
  getAddress(streetLetters: string): AddressDto[] {
    this.pushedAddrItems = new Array<AddressDto>();
    this.registerService.getAddressByCityIdStreet(this.registerDto.addressDto.cityId, streetLetters)
    .subscribe(response => {
      if (response != null) {
        response.forEach(element => {
          let newAddress = new AddressDto();
          newAddress.cityId = element.cityId;
          newAddress.cityName = element.cityName;
          newAddress.flatNumber = element.flatNumber;
          newAddress.houseNumber = element.houseNumber;
          newAddress.street = element.street;
          newAddress.allAddress = element.allAddress;
          newAddress.id = element.id;
          this.pushedAddrItems.push(newAddress);
        });
      }
    });
    return this.pushedAddrItems;
  }
  passCitytoAddr(cityId: number) {
    this.registerDto.addressDto.cityId = cityId;
    this.cityGetSuccess = true; // to make addresBox Visible
  }
  // assign role
  // if user cant find flat - admin
  // otherwise - flatmate
  // inform that selection has been done
  passAddrSelectState(id: number) {
    this.addrSelectSuccess = true;
    this.registerDto.addressDto.id = id;
  }

  selectRole(addrSelectSuccess: boolean) {
    if (addrSelectSuccess) {
      this.registerVariable = RolesEnum.Flatmate;
    }
    else {
      this.registerVariable = RolesEnum.FlatMateAdmin;
    }
  }
}

// validate autocomplete form
export function forbiddenNamesValidator(cities: CityDto[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // below findIndex will check if control.value is equal to one of our options or not
    const index = cities.findIndex(name => {
      return (new RegExp('\^' + name.cityName + '\$')).test(control.value);
    });
    return index < 0 ? { 'forbiddenNames': { value: control.value } } : null;
  };
}
