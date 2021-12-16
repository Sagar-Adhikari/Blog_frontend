import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { UsersComponent } from 'src/app/modules/auth/users/users.component';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { MaterialModules } from '../../shared/material.models';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterUserComponent } from './register-user/register-user.component';

@NgModule({
  declarations: [LoginComponent, RegisterUserComponent, UsersComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    MaterialModules,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.threeBounce,
      backdropBackgroundColour: "transparent",
      backdropBorderRadius: "0px",
      primaryColour: "Navy",
      secondaryColour: "Navy",
      tertiaryColour: "Navy",
      fullScreenBackdrop: false,
    }),
  ],
})
export class AuthModule {}
