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
  pushedStreetItems: string[] = [];
  citySelectionDto: AddressDto = new AddressDto();
  cityGetSuccess: boolean = false;

  cityCtrl: FormControl = new FormControl();
  streetCtrl: FormControl = new FormControl();
  citiesList: Observable<CityDto[]>;
  streetList: Observable<string[]>;
  streetSelectSuccess: boolean;
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
    this.streetList = this.streetCtrl.valueChanges.pipe(
      startWith(''),
      map(street => (street.length >= 2 &&
      this.cityGetSuccess ? this.getStreet(street) : []))
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

  getStreet(street: string): string[] {
    if (this.streetSelectSuccess) {
      // this will block another getRequest after selecting the cities.
      return this.pushedStreetItems;
    }
    this.pushedStreetItems = new Array<string>();
    this.flataddresService.getStreet(this.citySelectionDto.cityId, street)
    .subscribe(response => {
      if (response != null && response.length !== 0) {
        response.forEach(element => {
          this.pushedStreetItems.push(element);
        });
      }
    });
    return this.pushedStreetItems;
  }

  passStreetSelection(street: string) {
    this.streetSelectSuccess = true;
    this.citySelectionDto.street = street;
  }

  searchCertainFlat() {
    this.disabledButton = true;
      this.flataddresService.getAddressByFlatHouseNumb(this.form.value.houseNumber,
        this.form.value.flatNumber, this.streetCtrl.value,
        this.citySelectionDto.cityId ).subscribe(response => {
          this.disabledButton = false;
          if (response != null) {
            this.flatDetails = response;
          }
        })
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
