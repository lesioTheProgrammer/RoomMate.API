import { Component, OnInit } from '@angular/core';
import { CityDto } from './dto/city-dto';
import { AddressDto } from './dto/address-dto';
import { FormControl, AbstractControl, ValidatorFn, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FlatAddressService } from './flat-address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  listOfCitiesToSelect: CityDto[] = [];
  listOfStreetsToSelect: string[] = [];
  citySelectionDto: AddressDto = new AddressDto();
  citySelected = false;
  streetSelected: boolean;

  cityControl: FormControl = new FormControl();
  streetControl: FormControl = new FormControl('', {
    validators: [Validators.required]
  });
  citiesList: Observable<CityDto[]>  = new  Observable<CityDto[]>();
  streetList: Observable<string[]>;
  disabledButton = true;
  form: FormGroup;
  flatDetails: AddressDto = new AddressDto();

  userExistInList: boolean = false;

  constructor(
    public flatAddressService: FlatAddressService
  ) {}

  ngOnInit() {
    this.citiesList = this.cityControl.valueChanges.pipe(
      startWith(''),
      map(letters => (letters.length >= 2  ? this.getCities(letters) : []))
    );
    this.streetList = this.streetControl.valueChanges.pipe(
      startWith(''),
      map(street => (street.length >= 2 &&
      this.citySelected ? this.getStreet(street) : []))
    );
    this.cityControl.setValidators(forbiddenNamesValidator(this.listOfCitiesToSelect, false));
    this.form = new FormGroup({
      houseNumber: new FormControl('', {
        validators: [Validators.required]
      }),
      flatNumber: new FormControl('', {
        validators: [Validators.required]
      }),

    });
    // add exisiting controll to form to simplyfy validation later on (!form.valid)
    this.form.addControl('streetControlValid', this.streetControl);
  }

  get f() {
    return this.form.controls;
  }

  getCities(letters: string): CityDto[] {
    if ((this.citySelectionDto.cityName !== letters) && (this.citySelectionDto.cityId !== 0 && this.citySelectionDto.cityId)) {
      this.citySelected = false;
      this.citySelectionDto.cityId = 0;
      this.citySelectionDto.cityName = '';
      this.listOfCitiesToSelect = [];
    }
    if (this.citySelected) {
      // this will block another getRequest after selecting the cities.
      return this.listOfCitiesToSelect;
    }
    this.listOfCitiesToSelect = new Array<CityDto>();
    this.flatAddressService.getCityByTwoLetters(letters).subscribe(response => {
      if (response != null) {

        response.forEach(element => {
          const newcity = new CityDto();
          newcity.cityId = element.cityId;
          newcity.cityName = element.cityName;
          this.listOfCitiesToSelect.push(newcity);
        });
        // false because if response will come there will be always new list
        this.cityControl.setValidators(forbiddenNamesValidator(this.listOfCitiesToSelect, false));
      }
    });
    return this.listOfCitiesToSelect;
  }

  citySelection(cityId: number, cityName: string) {
    this.citySelected = true;
    this.citySelectionDto.cityId = cityId;
    this.citySelectionDto.cityName = cityName;
    this.disabledButton = false;
    this.cityControl.setValue(cityName);
  }

  getStreet(street: string): string[] {
    if (this.streetSelected) {
      // this will block another getRequest after selecting the cities.
      return this.listOfStreetsToSelect;
    }
    this.listOfStreetsToSelect = new Array<string>();
    this.flatAddressService.getStreet(this.citySelectionDto.cityId, street)
    .subscribe(response => {
      if (response != null && response.length !== 0) {
        response.forEach(element => {
          this.listOfStreetsToSelect.push(element);
        });
      }
    });
    return this.listOfStreetsToSelect;
  }

  streetSelection(street: string) {
    this.streetSelected = true;
    this.citySelectionDto.street = street;
  }

  searchForFlat() {
    this.disabledButton = true;
    const flatDetailsGetReq = new AddressDto();
    flatDetailsGetReq.houseNumber = this.form.value.houseNumber;
    flatDetailsGetReq.flatNumber = this.form.value.flatNumber;
    flatDetailsGetReq.street = this.streetControl.value;
    flatDetailsGetReq.cityId = this.citySelectionDto.cityId;
     this.streetControl.markAsTouched(); // to display street error
      this.flatAddressService.getAddressByFlatHouseNumb(flatDetailsGetReq).subscribe(response => {
          this.disabledButton = false;
          if (response != null) {
            this.userExistInList = false;
            this.flatDetails = response;
            const loginCurrentUser = JSON.parse(localStorage.getItem("login"));
            this.flatDetails.loggedUserName = loginCurrentUser;
            this.flatDetails.users.forEach(element => {
              if (element.login.toLowerCase() === loginCurrentUser.toLowerCase() && !this.userExistInList) {
                this.userExistInList = true;
              }
          });
         }
        });
    }
}
// validate autocomplete form
export function forbiddenNamesValidator(citySelect: any, oldList: boolean): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // below findIndex will check if control.value is equal to one of our options or not
    if (citySelect === undefined) {
      return null;
    }
    if ((citySelect.length === 0) && oldList === false) {
      return { 'forbiddenNames': { value: control.value } };
    }
    const index = citySelect.findIndex(name => {
      return (new RegExp('\^' + name.cityName + '\$')).test(control.value);
    });
    if (citySelect.length === 0) {
      return null;
    }
    return index < 0 ? { 'forbiddenNames': { value: control.value } } : null;
  };
}
