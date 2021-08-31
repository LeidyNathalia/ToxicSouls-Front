import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-admin',
  templateUrl: './sidebar-admin.component.html',
  styleUrls: ['./sidebar-admin.component.scss']
})
export class SidebarAdminComponent implements OnInit {

  isAdmin: boolean;

  constructor() {
    if(localStorage.getItem('role') == 'admin') {
      this.isAdmin = true;
    }
   }

  ngOnInit(): void {
  }

}
