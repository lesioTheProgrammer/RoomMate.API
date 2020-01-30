import { Injectable } from "@angular/core";
import { RequestHelperService } from "../request-helper/request-helper.service";
import { HttpClient } from "@angular/common/http";
import { LoginDto } from "./login/dto/login-dto";
import { RegisterDto } from "./register/dto/register-dto";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { TokenDto } from "./login/dto/token-dto";
import { UserListDto } from "./dto/user-list-dto";

@Injectable({
  providedIn: "root"
})
export class UserManagementService extends RequestHelperService {
  protected getApiRoute(): string {
    return "UserManagement";
  }
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }
  // do not write pipes
  public login(loginDto: LoginDto): Observable<TokenDto> {
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
}
