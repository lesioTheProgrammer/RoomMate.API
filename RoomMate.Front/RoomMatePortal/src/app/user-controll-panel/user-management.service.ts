import { Injectable } from '@angular/core';
import { RequestHelperService } from '../request-helper/request-helper.service';
import { HttpClient } from '@angular/common/http';
import { LoginDto } from './login/dto/login-dto';
import { RegisterDto} from './register/dto/register-dto';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService extends RequestHelperService {
  protected getApiRoute(): string {
    //ta nazwa mowi do jakiego kontrolera wlaimy strzlaa elo
    return 'UserManagement';
  }
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }
//pajpow nie pisac, observejbel po to zeby api wiedzial co zwroce
  public login(loginDto: LoginDto): Observable<boolean> {
    //login metoda juz z api hehe, przy poscie sam ogarniw
    return this.createPostRequest('Login', loginDto).pipe(map(data => <boolean>data));
  }

  public register(RegisterDto: RegisterDto): Observable<boolean> {
    return this.createPostRequest('Register', RegisterDto).pipe(map(data => <boolean>data));
  }
}
