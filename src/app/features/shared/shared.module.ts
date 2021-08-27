import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
// import { SidebarHomeComponent } from '../home/components/sidebar-home/sidebar-home.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    //FormControl,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatCardModule
  ],
  exports: [
    //FormControl,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSidenavModule
  ]
})

export class SharedModule { }
