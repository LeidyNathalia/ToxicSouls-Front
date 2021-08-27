import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header-service/header.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  userLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private router: Router,
    private userService: UserService,
    private headerService: HeaderService
    ) { }

  ngOnInit(): void {
  }

  async submit(): Promise<any> {
    try {
      const result = await this.userService.loginUser(this.userLogin.value);
      if (result.role === 'super-admin') {
        this.router.navigate(['/admin']);
        localStorage.setItem('token', result.token);
        const header = this.headerService.createHeader(localStorage.getItem('token'));
        console.log(result.token);
      } else {
        console.log('Admin normal');
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}
