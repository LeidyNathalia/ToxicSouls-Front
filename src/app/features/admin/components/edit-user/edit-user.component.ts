import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup,Validators} from '@angular/forms';
import { ActivatedRoute, ResolveStart, Router } from '@angular/router';
import { UserService } from '../../../../services/user-service/user.service';
import { HeaderService } from '../../../../services/header-service/header.service';

interface User{
  cc:number,
  name: string,
  email: string,
  password: string,
  roles: [string]
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit{

  data: User;

  id: string;
  editForm = new FormGroup({
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

  constructor(
    private routes : Router,
    private userService: UserService,
    private headerService: HeaderService,
    private actroutes: ActivatedRoute
    ) {
      this.id = this.actroutes.snapshot.queryParams.id;
      this.getUser();
  }

  async getUser():Promise<any>{
    const header = this.headerService.createHeader(localStorage.getItem('token'));
    const user = await this.userService.getUserById(this.id, header);
    console.log("user holi"+  user.user.name + user.user.roles);
    this.editForm.patchValue({cc: user.user.cc});
    this.editForm.patchValue({name: user.user.name});
    this.editForm.patchValue({email: user.user.email});
    this.editForm.patchValue({password: user.user.password});
    console.log(this.editForm.value.password + "lllllllll");
    // console.log("valor fecha",event.event.date_event )
    // console.log("form by id",event);
    // console.log("event",event.event);
  }

  ngOnInit(): void {
  }

  async submit(): Promise<any>{
    try {
      const header = this.headerService.createHeader(localStorage.getItem('token'));
      const token = header.get('access-token');
      console.log(token);
      const role:[string] = ["admin"];
      let user:User;
      console.log("Papa" + localStorage.getItem('role'))
      if (localStorage.getItem('role') === "super-admin") {
        user = {
          cc: this.editForm.value.cc,
          name: this.editForm.value.name,
          email: this.editForm.value.email,
          password: this.editForm.value.password,
          roles:role
        }
      }else{
        user = {
          cc: this.editForm.value.cc,
          name: this.editForm.value.name,
          email: this.editForm.value.email,
          password: this.editForm.value.password,
          roles:role
        }
      }
      console.log (user.roles + "Useeeeeeeeer");
      const result = await this.userService.editUser(this.id, user, header);
      this.routes.navigate(['/admin/list']);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
}

