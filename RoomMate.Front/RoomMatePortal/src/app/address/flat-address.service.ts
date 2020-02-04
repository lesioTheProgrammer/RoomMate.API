import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { CityDto } from "./dto/city-dto";
import { environment } from "../../environments/environment";
import { AddressFlatDto } from "./dto/address-dto";

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
    addressDto: AddressFlatDto
  ): Observable<AddressFlatDto> {
    const route = "GetFlat";
    return this.httpClient.get<AddressFlatDto>(this.wwwPath + "/" + route, {
      params: <any>addressDto
    });
  }


  public assignUserToFlat(addressDto: AddressFlatDto): Observable<boolean> {
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

    public leaveflat(addressDto: AddressFlatDto): Observable<boolean> {
      const route = "LeaveFlat";
      return this.httpClient.post<boolean>(this.wwwPath + "/" + route,
      JSON.stringify(addressDto),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
    }

    public addTheFlat(addressDto: AddressFlatDto): Observable<AddressFlatDto> {
      const route = "AddNewFlat";
      return this.httpClient.post<AddressFlatDto>(this.wwwPath + "/" + route,
      JSON.stringify(addressDto),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      });
    }


    public getAllFlats(loggedUserName: string): Observable<AddressFlatDto[]> {
      const route =  "GetUserFlat";
      const paramsAsObj: Object = { loggedUserName };

      return this.httpClient.get<AddressFlatDto[]>(this.wwwPath + "/" + route, {
        params: <any>paramsAsObj
      });
    }
}
