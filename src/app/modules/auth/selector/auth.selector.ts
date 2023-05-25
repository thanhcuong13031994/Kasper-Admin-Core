import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../reducer/auth.reducer";

export const selectAuthState = createFeatureSelector<AuthState>("auth");

export const  selectIsLogin = () => createSelector(
  selectAuthState,
  state => state.isLogin
)
