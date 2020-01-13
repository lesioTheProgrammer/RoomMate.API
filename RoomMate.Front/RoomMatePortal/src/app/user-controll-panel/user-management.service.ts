import { Injectable } from "@angular/core";
import { RequestHelperService } from "../request-helper/request-helper.service";
import { HttpClient } from "@angular/common/http";
import { LoginDto } from "./login/dto/login-dto";
import { RegisterDto } from "./register/dto/register-dto";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { TokenDto } from "./login/dto/token-dto";
import { UserListDto } from "./dto/user-list-dto";
import { AddressDto } from "../address/dto/address-dto";
import { CityDto } from "../address/dto/city-dto";

@Injectable({
  providedIn: "root"
})
export class UserManagementService extends RequestHelperService {
  protected getApiRoute(): string {
    //ta nazwa mowi do jakiego kontrolera wlaimy strzlaa elo
    return "UserManagement";
  }
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }
  //pajpow nie pisac, observejbel po to zeby api wiedzial co zwroce
  public login(loginDto: LoginDto): Observable<TokenDto> {
    //login metoda juz z api hehe, przy poscie sam ogarniw
    return this.createPostRequest("Login", loginDto).pipe(
      map(data => <TokenDto>data)
    );
  }

  public register(RegisterDto: RegisterDto): Observable<boolean> {
    return this.createPostRequest("Register", RegisterDto).pipe(
      map(data => <boolean>data)
    );
  }

  public getUserByFlatId(flatId: number): Observable<Array<UserListDto>> {
    return this.createGetRequestByParams("GetUserByFlatId", {
      flatId: flatId
    });
  }

  public getCityByTwoLetters(letters: string): Observable<CityDto[]>{
    return this.createGetRequestByParams<CityDto[]>('GetCities', {letters})
    .pipe(map(data => <CityDto[]>data));
  }
}
