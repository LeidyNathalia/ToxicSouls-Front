import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseEvents, responseEventById, ResponseCreateEvent, Events, ResponseEditEvent } from '../../features/home/components/eventos/interface/events.interface';
import * as Config from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  path: string = `${Config.path}/events`;

  constructor(private http: HttpClient) {}

  getEvents(): Promise<any> {
    return this.http.get<any>(this.path).toPromise();
  }

  getEvents2(): Observable<ResponseEvents>{
    return this.http.get<ResponseEvents>(this.path);
  }

  getEventById(_id): Promise<any>{
    return this.http.get<any>(`${this.path}/${_id}`).toPromise();
  }

  getEventById2(_id:string): Observable<responseEventById>{
    return this.http.get<responseEventById>(`${this.path}/${_id}`);
  }

  deleteEvent(_id): Promise<any>{
    return this.http.delete<any>(`${this.path}/${_id}`).toPromise();
  }

  editEvent(_id, body): Promise<any>{
    return this.http.put<any>(`${this.path}/${_id}`, body).toPromise();
  }

  editEvent2(_id: string, body: Events): Observable<ResponseEditEvent>{
    return this.http.put<ResponseEditEvent>(`${this.path}/${_id}`, body);
  }

  addEvent(body: Events): Observable<ResponseCreateEvent> {
    return this.http.post<ResponseCreateEvent>(`${this.path}/add-event`, body);
  }
}
