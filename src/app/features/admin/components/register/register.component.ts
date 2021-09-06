import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../../services/user-service/user.service';
import { HeaderService } from '../../../../services/header-service/header.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  registerForm = new FormGroup({
    cc : new FormControl('', [
      Validators.required,
      Validators.maxLength(10)
    ]),

    name : new FormControl('', [
      Validators.required
      // Validators.email,
    ]),

    email : new FormControl('', [
      Validators.required,
      Validators.email
    ]),

    password : new FormControl('', [
      Validators.required
      // Validators.email,
    ]),

  })

  constructor(private routes : Router, private userService: UserService,
    private headerService: HeaderService
    ) {
  }

  ngOnInit(): void {
  }

  async submit(): Promise<any>{
    try {
      const header = this.headerService.createHeader(localStorage.getItem('token'));
      const token = header.get('access-token');
      console.log(token);
      const result = await this.userService.registerUser(header, this.registerForm.value);
      this.routes.navigate(['/admin/list']);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}
