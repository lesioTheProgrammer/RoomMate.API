import { Injectable, EventEmitter, Output } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

@Injectable()
export class PassBetweenComponService {
  private loginSource = new BehaviorSubject<boolean>(false);
  currentLoginState = this.loginSource.asObservable();

  @Output() login: EventEmitter<boolean> = new EventEmitter();

  sendLoginState(isLoggex: boolean) {
    const getToken = localStorage.getItem("jwt");
    if (getToken) {
      this.loginSource.next(true);
    }
  }
}
