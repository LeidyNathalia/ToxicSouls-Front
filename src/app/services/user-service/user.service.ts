import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  path: string = 'http://18.224.229.72:3000/api/user';

  constructor(private http: HttpClient) { }


  loginUser(data: any): Promise<any> {
    return this.http.post<any>(this.path + '/login-user', data).toPromise();
  }

  signIn(data: {}): Observable<any>{
    return this.http.post(`${this.path}/login-user`, data);
  }

  registerUser(header: any, data: any): Promise<any> {
    return this.http.post<any>(this.path + '/add-user', data, {headers: header}).toPromise();
  }

  getUsers(headers:any): Promise<any> {
    return this.http.get<any>(this.path, {headers: headers}).toPromise();
  }

  deleteUser(_id: string, headers: any): Promise<any>{
    return this.http.delete<any>(this.path + '/' + _id, {headers: headers}).toPromise();
  }

  getUserById(_id: string, headers: any): Promise<any>{
    return this.http.get<any>(this.path + '/' + _id, {headers: headers}).toPromise();
  }

  editUser(_id, body, headers: any): Promise<any>{
    return this.http.put<any>(`${this.path}/${_id}`, body, {headers: headers}).toPromise();
  }


}
