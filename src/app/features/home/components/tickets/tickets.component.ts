import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Events } from '../eventos/interface/events.interface';
import { EventService } from '../../../../services/user-service/event.service';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  _id:string;
  event: Events = {};

  constructor(private actroutes: ActivatedRoute, private eventsService: EventService, private router:Router) {
    this._id = this.actroutes.snapshot.queryParams._id;
    this.eventsService.getEventById2(this._id)
    .subscribe((resp)=>{
      this.event = resp.event;
    },(error)=>{
      console.log("Cualquier cosa");
      this.router.navigate(['/events']);
    });
  }

  ngOnInit(): void {

  }

}
