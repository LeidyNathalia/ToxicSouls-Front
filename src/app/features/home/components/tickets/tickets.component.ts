import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Events, Presale } from '../eventos/interface/events.interface';
import { EventService } from '../../../../services/user-service/event.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {

  _id:string;
  event: Events = {};
  fecha:string;
  precio:number = 0;

  constructor(private actroutes: ActivatedRoute, private eventsService: EventService, private router:Router, private datePipe:DatePipe) {
    const fech = new Date();
    this.fecha = this.datePipe.transform(fech,'yyyy-MM-dd');
    this._id = this.actroutes.snapshot.queryParams._id;
    this.eventsService.getEventById2(this._id)
    
    .subscribe((resp)=>{
      this.event = resp.event;
      this.compareDate(this.event.presales);
    },(error)=>{
      console.log("Cualquier cosa");
      this.router.navigate(['/events']);
    });
    console.log("preventas con",this.event);
   
  }

  ngOnInit(): void {
    
  }

  compareDate(presales:Presale[]){
    if(presales.length == 1){
      this.precio = parseInt(presales[0].price_presale);
      this.precio = this.precio*100;
      console.log("precio mul" , this.precio)
    }
  }

}
