import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../../services/user-service/event.service';
import { Events } from '../interface/events.interface';

@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.scss']
})


export class ViewEventsComponent implements OnInit {

  events: Events[] = [];

  constructor(private eventService:EventService) {}

  ngOnInit(): void {
    this.eventService.getEvents2()
    .subscribe((resp)=>{
      this.events = resp.events;

    });
  }

}
