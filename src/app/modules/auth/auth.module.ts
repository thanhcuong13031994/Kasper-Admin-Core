import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AUTH_COMPONENT } from './components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { StoreModule } from '@ngrx/store';
import { authReducers } from './reducer/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './effect/auth.effect';


@NgModule({
  declarations: [
    AUTH_COMPONENT,
    CreateAccountComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    StoreModule.forFeature("auth", authReducers),
    EffectsModule.forFeature([AuthEffect])
  ]
})
export class AuthModule { }
