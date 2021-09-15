import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/services/header-service/header.service';
import { UserService } from 'src/app/services/user-service/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  email: boolean = false;
  password: boolean = false;
  error: boolean = false;



  constructor(
    private router: Router,
    private userService: UserService,
    private headerService: HeaderService,
    private routes: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void { }

  signIn(): void {
    this.userService.signIn(this.userLogin.value)
      .subscribe((resp) => {
        console.log(resp);
        const userData = {
          name: resp.name,
          email: resp.email
        };
        localStorage.setItem('userData', JSON.stringify(userData));
        if (resp.role === 'super-admin') {
          localStorage.setItem('role', 'super-admin');
          this.router.navigate(['/admin/list-event']);
          localStorage.setItem('token', resp.token);
          const header = this.headerService.createHeader(
            localStorage.getItem('token')
          );
          console.log(resp.token);
          console.log(resp.name, resp.email);
        } else {
          const header = this.headerService.createHeader(
            localStorage.getItem('token')
          );
          console.log('Admin normal');
          localStorage.setItem('role', 'admin');
          this.routes.navigate(['/admin/list-event']);

        }
      }, (err) => {
        console.log(err.error.message);
        if (err.error.message === 'User not found') {
          this.email = true;
          this.password = false;
          this.error = false;
        } else if (err.error.message === 'Wrong password') {
          this.password = true;
          this.email = false;
          this.error = false;
        } else {
          this.error = true;
          this.snackBar.openFromComponent(ErrorComponet, {
            duration: 5000
          });
          this.password = false;
          this.email = false;
        }
      });
  }
}

@Component({
  selector: 'error-component',
  template: `<span class="error-card">
  El servidor no puede procesar la petición, intente nuevamente más tarde
</span>`,
  styles: [`
    .error-card {
      color: hotpink;
      font-size: 20px;
      font-family:"Times New Roman";
    }
  `],
})
export class ErrorComponet { }
