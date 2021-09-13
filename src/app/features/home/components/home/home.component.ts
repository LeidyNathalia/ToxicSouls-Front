import { Component, OnInit } from '@angular/core';
import { CarouselController, CarouselImage } from 'ng-simple-carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  public controllerButton = new CarouselController();

  constructor() { }

  ngOnInit(): void {
  }

  images: CarouselImage[] = [
    { id: 'australian', src: 'assets/img/Slide 3.JPG' },
    { id: 'dachshund', src: 'assets/img/Slide 4.jpg' },
    { id: 'shiba', src: 'assets/img/Slide 5.jpg' }
  ];

  onImgChange(id: string) {
    console.log(id);
  }
}
