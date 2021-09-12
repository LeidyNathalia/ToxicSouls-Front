import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Artist, responseArtist } from 'src/app/features/admin/components/Artistas/interfaces/artist.interface';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  path: string = 'http://localhost:3000/api/artists';

  constructor(private http: HttpClient) {
   }

  getArtist(): Promise<any> {
    return this.http.get<any>(this.path).toPromise();
  }

  getArtistById(_id: string): Promise<any>{
    return this.http.get<any>(`${this.path}/${_id}`).toPromise();
  }

  deleteArtist(_id: string): Promise<any>{
    return this.http.delete<any>(`${this.path}/${_id}`).toPromise();
  }

  editArtist(_id: string, body: any): Promise<any>{
    return this.http.put<any>(`${this.path}/${_id}`, body).toPromise();
  }

  registerArtist(data: any): Observable<any> {
    return this.http.post(`${this.path}/add-artist`, data);
  }
  getAllArtists(): Observable <responseArtist> {
    return this.http.get<responseArtist>(this.path);
  }
}
