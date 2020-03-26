import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { LoginDto } from "./dto/login-dto";
import { MatDialogRef } from "@angular/material";
import { UserManagementService } from "../user-management.service";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  errorShow: boolean = false;
  dataLoaded: boolean = false;
  isLogged: boolean = false;
  loginDto: LoginDto = new LoginDto();
  @Output() loginEvent = new EventEmitter<boolean>();

  constructor(
    public dialogRef: MatDialogRef<LoginComponent>,
    public loginService: UserManagementService,
    public route: Router
  ) {}

  ngOnInit() {}

  closeModal(): void {
    this.dialogRef.close();
  }

  login() {
    this.loginService.login(this.loginDto).subscribe(
      response => {
        if (response.token !== "") {
          localStorage.setItem("login", JSON.stringify(this.loginDto.login));
          localStorage.setItem("jwt", response.token);
          this.loginEvent.emit(this.isLogged);
          this.closeModal();
          this.isLogged = true;
          this.route.navigate(["/dashboard"]);
        }
      },
      error => {
        this.errorShow = true;
      }
    );
  }
}
