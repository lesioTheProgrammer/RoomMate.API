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

  public getStreet(
    id: any,
    streetLetters: string
  ): Observable<string[]> {
    const route = "GetStreet";
    const body = new HttpParams({
      fromObject : {
        id : id,
        streetLetters : streetLetters
      }
    })
    return this.httpClient.get<string[]>(this.wwwPath + "/" + route, {
      params: body
    });
  }

  public getAddressByFlatHouseNumb(
    addressDto: AddressDto
  ): Observable<AddressDto> {
    const route = "GetFlat";
    return this.httpClient.get<AddressDto>(this.wwwPath + "/" + route, {
      params: <any>addressDto
    });
  }


  public assignUserToFlat(addressDto: AddressDto): Observable<boolean> {
    const route = "AssignMateToFlat";
    return this.httpClient.post<boolean>(this.wwwPath + "/" + route,
    JSON.stringify(addressDto),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
    }

}
