import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  path: string = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) { }


  loginUser(data: any): Promise<any> {
    return this.http.post<any>(this.path + '/login-user', data).toPromise();
  }

  registerUser(header: any, data: any): Promise<any> {
    return this.http.post<any>(this.path + '/add-user', data, {headers: header}).toPromise();
  }
}
