import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { PrincipalComponent } from './components/principal/principal.component';
import { RegisterComponent } from './components/register/register.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SharedModule } from '../shared/shared.module';
import { SidebarHomeSignInComponent } from './components/sidebar-home-sign-in/sidebar-home-sign-in.component';

@NgModule({
  declarations: [
    PrincipalComponent,
    RegisterComponent,
    SignInComponent,
    SidebarHomeSignInComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
