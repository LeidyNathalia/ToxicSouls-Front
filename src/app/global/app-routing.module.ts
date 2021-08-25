import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('../features/home/home.module').then(m => m.HomeModule) },
  { path: 'auth', loadChildren: () => import('../features/auth/auth.module').then(m => m.AuthModule) },
  { path: 'admin', loadChildren: () => import('../features/admin/admin.module').then(m => m.AdminModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
