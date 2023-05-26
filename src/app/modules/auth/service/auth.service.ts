import { Injectable } from "@angular/core";
import { Observable, ReplaySubject, delay, from, of, tap } from "rxjs";
import { Credential } from "./credential.service";
@Injectable({
  providedIn: "root"
})

export class AuthService {
  cache = localStorage;
  public authState$: ReplaySubject<any>;

  constructor(private credential: Credential)
  {
    this.authState$ = new ReplaySubject(1);
    this.authState$.next(false);
  }

	public getCurrentUser() {
		return this.authState$.asObservable();
	}

  public rand() {
    return Math.random().toString(36).substr(2);
  };

  public token() {
      return this.rand() + this.rand();
  };


  public dataLogin = {
    userName: 'kaspercompany',
    password: 'kaspercompany#',
    token: this.token()
  }

  checkLogin(authData: any){
    if(authData.username == this.dataLogin.userName && authData.password == this.dataLogin.password) {
      this.credential.setKasperAccessTokenKey(this.dataLogin.token);
      this.credential.setUserName(this.dataLogin.userName);
      this.authState$.next(this.credential.getUsername());
      return true;
    }
    return false;
  }

  public login(authData: any): Observable<any> {
    return of(this.checkLogin(authData));
  }
}
