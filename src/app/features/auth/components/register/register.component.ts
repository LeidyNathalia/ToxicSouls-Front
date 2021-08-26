import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm,  Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  registerForm = new FormGroup({
    ccFormControl : new FormControl('', [
<<<<<<< HEAD
      Validators.required

=======
      Validators.required,
      Validators.maxLength(10)
>>>>>>> origin/other-b
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

<<<<<<< HEAD
  matcher = new ErrorStateMatcher();

=======
  submit(): void {
    console.log(this.registerForm.value);
  }
>>>>>>> origin/other-b
}
