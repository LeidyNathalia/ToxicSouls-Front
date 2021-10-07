import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../../../../../services/user-service/artist.service';
import { Router } from '@angular/router';
import { Artist } from '../interfaceArtist/artist.interface';

@Component({
  selector: 'app-viewArtist',
  templateUrl: './viewArtist.component.html',
  styleUrls: ['./viewArtist.component.scss']
})
export class ViewArtist implements OnInit {

  artist: Artist[] = [];

  constructor(private artistService:ArtistService, private reuter:Router) { }

  ngOnInit(): void {
    this.artistService.getAllArtists()
    .subscribe((resp)=>{
      this.artist = resp.artists;
    });
  }

  imprimirArtist(listArtists:Artist[]){
    listArtists.forEach(element => {
    });
  }
}
