import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  path: string = 'http://localhost:3000/api/events';

  constructor(private http: HttpClient) { }

  getEvents(): Promise<any> {
    return this.http.get<any>(this.path).toPromise();
  }

  deleteEvent(_id): Promise<any>{
    return this.http.delete<any>(`${this.path}/${_id}`).toPromise();
  }
}
