import { Component, OnInit } from '@angular/core';
import { CityDto } from './dto/city-dto';
import { AddressDto } from './dto/address-dto';
import { FormControl, AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FlatAddressService } from './flat-address.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  pusheditems: CityDto[] = [];
  pushedAddrItems: AddressDto[] = [];
  citySelectionDto: AddressDto = new AddressDto();
  cityGetSuccess: boolean = false;
  citiesList: Observable<CityDto[]>;
  cityCtrl: FormControl = new FormControl();
  addresCtrl: FormControl = new FormControl();
  addressesList: Observable<AddressDto[]>;
  addrSelectSuccess: boolean;
  disabledButton = false;

  form: FormGroup;

  flatDetails: AddressDto = new AddressDto();




  constructor(
    public flataddresService: FlatAddressService
  ) {}

  ngOnInit() {
    this.citiesList = this.cityCtrl.valueChanges.pipe(
      startWith(''),
      map(letters => (letters.length >= 2  ? this.getCities(letters) : []))
    );
    this.addressesList = this.addresCtrl.valueChanges.pipe(
      startWith(''),
      map(streetLetters => (streetLetters.length >= 2 && this.cityGetSuccess ? this.getAddress(streetLetters) : []))
    );
    this.cityCtrl.setValidators(forbiddenNamesValidator(this.pusheditems));

    this.form = new FormGroup({
      houseNumber: new FormControl(),
      flatNumber: new FormControl()
    });
    // on init ends here
  }

  getCities(letters: string): CityDto[] {
    if (this.cityGetSuccess){
      // this will block another getRequest after selecting the cities.
      this.cityCtrl.setValidators(forbiddenNamesValidator(this.pusheditems));
      return this.pusheditems;
    }
    this.pusheditems = new Array<CityDto>();
    this.flataddresService.getCityByTwoLetters(letters).subscribe(response => {
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

  passCitytoAddr(cityId: number, cityName: string) {
    this.citySelectionDto.cityId = cityId;
    this.citySelectionDto.cityName = cityName;
    this.cityGetSuccess = true; // to make addresBox Visible
  }

  getAddress(streetLetters: string): AddressDto[] {
    if (this.addrSelectSuccess){
      // this will block another getRequest after selecting the cities.
      return this.pushedAddrItems;
    }
    this.pushedAddrItems = new Array<AddressDto>();
    this.flataddresService.getAddressByCityIdStreet(this.citySelectionDto.cityId, streetLetters)
    .subscribe(response => {
      debugger;
      if (response != null && response.length !== 0) {
        response.forEach(element => {
          debugger;
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

  passAddrSelectState(id: number, street: string) {
    this.addrSelectSuccess = true;
    this.citySelectionDto.id = id;
    this.citySelectionDto.street = street;
  }

  searchCertainFlat() {
    this.disabledButton = true;
    // if user started to type street and theres no such
    // street dont even search for it
    debugger;
    if (this.addrSelectSuccess) {
      this.flataddresService.getAddressByFlatHouseNumb(this.form.value.houseNumber,
        this.form.value.flatNumber, this.citySelectionDto.street,
        this.citySelectionDto.cityId ).subscribe(response => {
          if (response != null) {
            this.flatDetails = response;
            this.disabledButton = false;
          }
        })
    }
    else {
      debugger;
      this.flatDetails = new AddressDto();
      this.flatDetails.cityId = this.citySelectionDto.cityId;
      this.flatDetails.cityName = this.citySelectionDto.cityName;
      this.flatDetails.street = this.addresCtrl.value; //good
      this.flatDetails.houseNumber = this.form.value.houseNumber;
      this.flatDetails.flatNumber = this.form.value.flatNumber;
      // theres no such flat pass input values to child, add new flat there
      // if recognized as new flat
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
    if (cities.length === 0) {
      return null;
    }
    return index < 0 ? { 'forbiddenNames': { value: control.value } } : null;
  };
}
