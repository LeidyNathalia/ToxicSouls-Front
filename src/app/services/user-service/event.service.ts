import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseEvents } from '../../features/home/components/eventos/interface/events.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  path: string = 'http://localhost:3000/api/events';

  constructor(private http: HttpClient) { }

  getEvents(): Promise<any> {
    return this.http.get<any>(this.path).toPromise();
  }

  getEvents2(): Observable<ResponseEvents>{
    return this.http.get<ResponseEvents>(this.path);
  }

  getEventById(_id): Promise<any>{
    return this.http.get<any>(`${this.path}/${_id}`).toPromise();
  }

  deleteEvent(_id): Promise<any>{
    return this.http.delete<any>(`${this.path}/${_id}`).toPromise();
  }

  editEvent(_id, body): Promise<any>{
    return this.http.put<any>(`${this.path}/${_id}`, body).toPromise();
  }
}
