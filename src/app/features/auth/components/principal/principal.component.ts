import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent implements OnInit {

  isSuperAdmin : boolean;
  isUser : boolean = false;
  
  constructor() {
    const result = localStorage.getItem('role');

    if(result === undefined){
        this.isUser = true;
    }

    if (localStorage.getItem('role') === "super-admin") {
      this.isSuperAdmin = true;
    }
  }

  ngOnInit(): void {
  }



}
