import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header-service/header.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {


    userLogin = new FormGroup({

      email: new FormControl('', [
        Validators.required,
        Validators.email]),

      password: new FormControl('', [
        Validators.required]),
  });

  email:boolean;
  password:boolean;
  result:any;

  constructor(
    private router: Router,
    private userService: UserService,
    private headerService: HeaderService,
    private routes: Router
  ) {}

  ngOnInit(): void {}

  async submit(): Promise<any> {
    console.log("singIn")
    try {
      this.result = await this.userService.loginUser(this.userLogin.value);
      if (this.result.role === 'super-admin') {
        localStorage.setItem('role', 'super-admin');
        this.router.navigate(['/admin']);
        localStorage.setItem('token', this.result.token);
        const header = this.headerService.createHeader(
          localStorage.getItem('token')
        );
        console.log(this.result.token);
      } else {
        const header = this.headerService.createHeader(
          localStorage.getItem('token')
        );
        console.log('Admin normal');
        localStorage.setItem('role', 'admin');
        this.routes.navigate(['/admin']);
      }

      console.log(this.result);
    } catch (error) {
      this.email = true;
      console.log(error);
    }
  }
}
