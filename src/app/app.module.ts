import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';

import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { AddEmployeeComponent } from "./components/add-employee/add-employee.component";
import { AuthModule } from './modules/auth/auth.module';
import { MaterialModules } from './shared/material.models';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModules,
    AuthModule,
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
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
