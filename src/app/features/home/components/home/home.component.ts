import { Component, OnInit } from '@angular/core';
import { CarouselController, CarouselImage } from 'ng-simple-carousel';
import { ArtistService } from '../../../../services/user-service/artist.service';
import { Router } from '@angular/router';
import { Artist } from '../artists/interfaceArtist/artist.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  artist: Artist[] = [];

  public controllerButton = new CarouselController();

  constructor(private artistService:ArtistService, private reuter:Router) { }

  ngOnInit(): void {
    this.artistService.getAllArtists()
    .subscribe((resp)=>{
      this.artist = resp.artists;
    });
  }

  images: CarouselImage[] = [
    { id: 'australian', src: 'assets/img/Slide 3.JPG' },
    { id: 'dachshund', src: 'assets/img/Slide 4.jpg' },
    { id: 'shiba', src: 'assets/img/Slide 5.jpg' }
  ];

  onImgChange(id: string) {
    console.log(id);
  }
  
  imprimirArtist(listArtists:Artist[]){
    listArtists.forEach(element => {
    });
  }
}
