import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AUTH_COMPONENT } from './components';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAccountComponent } from './components/create-account/create-account.component';


@NgModule({
  declarations: [
    AUTH_COMPONENT,
    CreateAccountComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
