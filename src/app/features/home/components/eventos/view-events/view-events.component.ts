import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../../services/user-service/event.service';
import { Events } from '../interface/events.interface';
import { Artist } from '../../../../admin/components/Artistas/interfaces/artist.interface';


@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.scss']
})


export class ViewEventsComponent implements OnInit {

  events: Events[] = [];
  artist: Artist[] = [];

  constructor(private eventService:EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents2()
    .subscribe((resp)=>{
      this.events = resp.events;
      console.log("Holiii" + resp.events);
    });
  }

  imprimirArtist(listArtists:Artist[]){
    listArtists.forEach(element => {
      console.log(element + "wlelelee");
    });
  }
}
