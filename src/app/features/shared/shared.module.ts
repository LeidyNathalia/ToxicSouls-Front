import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // FormControl,
    MatInputModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatCardModule
  ],
  exports: [
    // FormControl,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatSidenavModule
  ]
})

export class SharedModule { }
