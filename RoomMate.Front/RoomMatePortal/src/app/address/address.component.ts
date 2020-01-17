import { Component, OnInit } from '@angular/core';
import { CityDto } from './dto/city-dto';
import { AddressDto } from './dto/address-dto';
import { FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
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
  addressDto: AddressDto = new AddressDto();
  cityGetSuccess: boolean;
  citiesList: Observable<CityDto[]>;
  cityCtrl: FormControl = new FormControl();
  addresCtrl: FormControl = new FormControl();
  addressesList: Observable<AddressDto[]>;
  addrSelectSuccess: boolean;


  constructor(
    public flataddresService: FlatAddressService
  ) {}

  ngOnInit() {
    this.citiesList = this.cityCtrl.valueChanges.pipe(
      startWith(''),
      map(letters => (letters.length >= 2 ? this.getCities(letters) : []))
    );
    this.addressesList = this.addresCtrl.valueChanges.pipe(
      startWith(''),
      map(streetLetters => (streetLetters.length >= 2 && this.cityGetSuccess ? this.getAddress(streetLetters) : []))
    );
    debugger;
    this.cityCtrl.setValidators(forbiddenNamesValidator(this.pusheditems));
    // on init ends here
  }

  getCities(letters: string): CityDto[] {
    /// First that will execute new empty list:
    debugger;
    this.pusheditems = new Array<CityDto>();
    debugger;
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

  passCitytoAddr(cityId: number) {
    debugger;
    this.addressDto.cityId = cityId;
    this.cityGetSuccess = true; // to make addresBox Visible
  }

  getAddress(streetLetters: string): AddressDto[] {
    this.pushedAddrItems = new Array<AddressDto>();
    this.flataddresService.getAddressByCityIdStreet(this.addressDto.cityId, streetLetters)
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

  passAddrSelectState(id: number) {
    this.addrSelectSuccess = true;
    this.addressDto.id = id;
  }

}

// validate autocomplete form
export function forbiddenNamesValidator(cities: CityDto[]): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    // below findIndex will check if control.value is equal to one of our options or not
    const index = cities.findIndex(name => {
      return (new RegExp('\^' + name.cityName + '\$')).test(control.value);
    });
    if (cities.length == 0){
      return null;
    }
    return index < 0 ? { 'forbiddenNames': { value: control.value } } : null;
  };
}
