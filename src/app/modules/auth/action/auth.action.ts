import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  LOGIN = '[Login] Action',
  LOGIN_SUCCESS = '[Login] Action Success',
}

export class LoginAction implements Action {
  readonly type = AuthActionTypes.LOGIN
  constructor(public authData: {username: string, password: string}){}
}

export class LoginActionSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS
  constructor(public isLogin: boolean){}
}
 export type AuthActions = LoginAction | LoginActionSuccess;
