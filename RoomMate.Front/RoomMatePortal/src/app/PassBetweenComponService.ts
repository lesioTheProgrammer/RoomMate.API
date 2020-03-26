import { Injectable, EventEmitter, Output } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { AddressFlatDto } from "./address/dto/address-dto";

@Injectable()
export class PassBetweenComponService {
  private loginSource = new BehaviorSubject<boolean>(false);
  currentLoginState = this.loginSource.asObservable();

  private leavingflatSource = new BehaviorSubject<boolean>(false);
  currentLeavingState = this.leavingflatSource.asObservable();

  @Output() login: EventEmitter<boolean> = new EventEmitter();

  sendLoginState(isLoggex: boolean) {
    const getToken = localStorage.getItem("jwt");
    if (getToken) {
      this.loginSource.next(true);
    }
    else {
      this.loginSource.next(false);
    }
  }

  leftFlat(item: any) {
    debugger;
    this.leavingflatSource.next(item);
  }
}
