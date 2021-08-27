import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  header: any;

  constructor() {
    this.header = new HttpHeaders();
  }


  createHeader(token: string) {
    const head = this.header.set('access-token', token);
    return head;
  }

  getHeader(name: string) {
    console.log(this.header);
  }
}
