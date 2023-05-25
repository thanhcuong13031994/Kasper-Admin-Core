import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";
import { AuthActionTypes, AuthActions } from "../action/auth.action";
export interface AuthState {
  isLogin: boolean;
}

export const adapter: EntityAdapter<AuthState> = createEntityAdapter<AuthState>();

const initialAuthState: AuthState = adapter.getInitialState({
  isLogin: false,
});

export function authReducers(
  state = initialAuthState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      console.log('AuthActionTypes.LOGIN',action.authData);
      return {
        ...state,
        isLogin: false,
      };
    case AuthActionTypes.LOGIN_SUCCESS:
      console.log('AuthActionTypes.LOGIN_SUCCESS',state.isLogin);
      return {
        ...state,
        isLogin: action.isLogin,
      };
    default:
      return state;
  }
}
