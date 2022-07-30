import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';

import { LoginRoutingModule } from '@src/app/login/login-routing.module';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { LoginComponent } from '@src/app/login/login.component';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    LoginRoutingModule,
    NativeScriptCommonModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LoginModule { }
