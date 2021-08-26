import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  registerForm = new FormGroup({
    ccFormControl : new FormControl('', [
      Validators.required,
      Validators.
    ]),

    nameFormControl : new FormControl('', [
      Validators.required
      // Validators.email,
    ]),

    emailFormControl : new FormControl('', [
      Validators.required
      // Validators.email,
    ]),

    passFormControl : new FormControl('', [
      Validators.required
      // Validators.email,
    ]),

  })

  constructor() {
  }

  ngOnInit(): void {
  }


}
