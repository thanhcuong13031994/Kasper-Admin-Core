import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import { AuthActionTypes, AuthActions, LoginAction, LoginActionSuccess } from "../action/auth.action";
import { AuthService } from "../service/auth.service";
import { catchError, map, switchMap, tap } from "rxjs";

@Injectable()
export class AuthEffect {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ){}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType<LoginAction>(AuthActionTypes.LOGIN),
      switchMap((payload) => {
        return this.authService.login(payload.authData);
      }),
      tap(res => {
        console.log(res)
      }),
      map(res => {
        // console.log('return new LoginSuccess(res)', res);
        return new LoginActionSuccess(res);
      }),
      catchError((error,caught) => {
        return caught;
      })
    )
  );
}
