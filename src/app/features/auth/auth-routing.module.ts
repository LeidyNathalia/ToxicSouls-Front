import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './components/principal/principal.component';
import { RegisterComponent } from './components/register/register.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SidebarHomeSignInComponent } from './components/sidebar-home-sign-in/sidebar-home-sign-in.component';

const routes: Routes = [
  {
    path: "", component: PrincipalComponent,
    children: [
      { path: "", component: SignInComponent },
      { path: "register", component: RegisterComponent },
      { path: "sidebar", component: SidebarHomeSignInComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
