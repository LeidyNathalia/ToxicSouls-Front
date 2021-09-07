import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  path: string = 'http://localhost:3000/api/artist';

  constructor(private http: HttpClient) { }

  getArtist(): Promise<any> {
    return this.http.get<any>(this.path).toPromise();
  }

  getArtistById(_id): Promise<any>{
    return this.http.get<any>(`${this.path}/${_id}`).toPromise();
  }

  deleteArtist(_id): Promise<any>{
    return this.http.delete<any>(`${this.path}/${_id}`).toPromise();
  }

  editArtist(_id, body): Promise<any>{
    return this.http.put<any>(`${this.path}/${_id}`, body).toPromise();
  }  
}