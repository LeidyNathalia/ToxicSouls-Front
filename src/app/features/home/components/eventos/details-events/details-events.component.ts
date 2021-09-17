import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../../../services/user-service/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-events',
  templateUrl: './details-events.component.html',
  styleUrls: ['./details-events.component.scss']
})
export class DetailsEventsComponent implements OnInit {

  constructor(private eventService:EventService, private router:Router) { }

  ngOnInit(): void {
  }

}
