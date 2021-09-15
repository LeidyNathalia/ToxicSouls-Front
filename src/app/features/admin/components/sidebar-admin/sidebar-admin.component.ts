import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface UserData{
  name: string,
  email: string
};


@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss']
})
export class SidebarAdminComponent implements OnInit {

  isAdmin: boolean;
  userData: UserData;

  constructor(private router: Router) {
    if(localStorage.getItem('role') == 'admin') {
      this.isAdmin = true;
    }
   }

  ngOnInit(): void {
    if(localStorage.getItem('userData')){
      this.userData = JSON.parse(localStorage.getItem('userData'));
    }
    console.log(this.userData);
  }

  exitToApp(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
