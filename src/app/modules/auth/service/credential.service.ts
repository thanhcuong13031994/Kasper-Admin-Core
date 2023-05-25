import { Injectable } from "@angular/core";
const USER_NAME_KEY = "userName";
const KASPER_ACCESS_TOKENKEY = "kasperAccessTokenKey";
@Injectable({
  providedIn: "root"
})

export class Credential {
  public kasperAccessTokenKey: string = '';
  public userName: any = null;
  public cacheTime = 60 * 60 * 24 * 1;

  cache = localStorage;

  constructor()
  {}

  public getKasperAccessTokenKey() {
    if (this.kasperAccessTokenKey) {
      return this.kasperAccessTokenKey;
    }

    const token = this.cache.getItem(KASPER_ACCESS_TOKENKEY);

    this.kasperAccessTokenKey = token || "";

    return token;
  }

  public setKasperAccessTokenKey(token: string) {
    this.kasperAccessTokenKey = token;

    if (token) {
      this.cache.setItem(KASPER_ACCESS_TOKENKEY, token);
    } else {
      this.cache.removeItem(KASPER_ACCESS_TOKENKEY);
    }
  }

  public getUsername() {
    if (this.userName) {
      return this.userName;
    }

    return (this.userName = this.cache.getItem(USER_NAME_KEY));
  }

  public setUserName(userName: string) {
    this.userName = userName;

    if (userName) {
      this.cache.setItem(USER_NAME_KEY, userName);
    } else {
      this.cache.removeItem(USER_NAME_KEY);
    }
  }
}
