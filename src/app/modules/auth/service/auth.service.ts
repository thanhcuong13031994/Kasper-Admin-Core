import { Injectable } from "@angular/core";
import { Observable, delay, from, of, tap } from "rxjs";
import { Credential } from "./credential.service";
@Injectable({
  providedIn: "root"
})

export class AuthService {
  cache = localStorage;

  constructor(private credential: Credential)
  {}

  public rand() {
    return Math.random().toString(36).substr(2);
  };

  public token() {
      return this.rand() + this.rand();
  };


  public dataLogin = {
    userName: 'kasperCompany',
    password: 'kasperCompany#',
    token: this.token()
  }

  checkLogin(authData: any){
    if(authData.username == this.dataLogin.userName && authData.password == this.dataLogin.password) {
      this.credential.setKasperAccessTokenKey(this.dataLogin.token);
      return true;
    }
    return false;
  }

  public login(authData: any): Observable<any> {
    return of(this.checkLogin(authData));
  }
}
