import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { LoginDto } from "./dto/login-dto";
import { MatDialogRef } from "@angular/material";
import { UserManagementService } from "../user-management.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  errorShow: boolean = false;
  dataLoaded: boolean = false;
  isLogged: boolean =  false;
  loginDto: LoginDto = new LoginDto();
  @Output() loginEvent = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    //trzeba wstrzyknac serwis
    public loginService: UserManagementService,
    //kolejny serwis zeby przeslac login data do dashboardu?
    //cookies:
    public cookie: CookieService
  ) {}

  ngOnInit() {}

  closeModal(): void {
    this.dialogRef.close();
  }
  //mam serwis i co tera
  //wrzucam dto i metode wywoluje tez
  login() {
    this.loginService.login(this.loginDto).subscribe(response => {
      if (response) {
        this.isLogged = true;
        this.loginEvent.emit(this.isLogged);
        //login
        var login = this.loginDto.login;
        //cookies:
        this.cookie.set('login', login);
        //local storage:
        sessionStorage.setItem('login', JSON.stringify(login));
        debugger;
        this.closeModal();
        }
      },
    error => {
      this.errorShow = true;
      }
    );
  }
  // addHousework() {
  //   this.dashboardService.addHouseWork(this.houseworkDto).subscribe(
  //     response => {
  //       if (response) {
  //         this.closeModal();
  //       }
  //     },
  //     error => {
  //       this.errorShow = true;
  //     }
  //   );
  // }


}
