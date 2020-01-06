import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

Injectable()
export class AuthGuard implements CanActivate {
  constructor() {
  }
  canActivate() {

    const getToken = localStorage.getItem("jwt");

    if (getToken){
      return true;
    }


    return false;
  }
}
