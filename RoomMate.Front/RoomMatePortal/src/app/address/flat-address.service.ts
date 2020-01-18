import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { CityDto } from "./dto/city-dto";
import { environment } from "../../environments/environment";
import { AddressDto } from "./dto/address-dto";

@Injectable({
  providedIn: "root"
})
export class FlatAddressService {
  protected getApiRoute(): string {
    // controllername
    return "Flat";
  }

  private wwwPath: string = environment.apiPath + this.getApiRoute();

  constructor(private httpClient: HttpClient) {}

  // this service will be without request helper

  public getCityByTwoLetters(letters: string): Observable<CityDto[]> {
    const route = "GetCities";
    const paramsAsObj: Object = { letters };
    return this.httpClient.get<CityDto[]>(this.wwwPath + "/" + route, {
      params: <any>paramsAsObj
    });
  }

  public getAddressByCityIdStreet(
    id: any,
    streetLetters: string
  ): Observable<AddressDto[]> {
    const route = "GetAddresses";
    const body = new HttpParams({
      fromObject : {
        'id' : id,
        'streetLetters' : streetLetters
      }
    })
    return this.httpClient.get<AddressDto[]>(this.wwwPath + "/" + route, {
      params: body
    });
  }


  public getAddressByFlatHouseNumb(houseNumber: any, flatNumber: any): Observable<AddressDto> {
    const route = "GetFlat";
    const body = new HttpParams({
      fromObject: {
        'houseNumber' : houseNumber,
        'flatNumber' : flatNumber
      }
    })
    return this.httpClient.get<AddressDto>(this.wwwPath + "/" + route, {
      params: body
    });

  }





}
