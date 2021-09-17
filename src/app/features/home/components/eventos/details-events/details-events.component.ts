import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../../../services/user-service/event.service';
import { Events, Presale } from '../interface/events.interface';
import { DatePipe } from '@angular/common';
import { FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-details-events',
  templateUrl: './details-events.component.html',
  styleUrls: ['./details-events.component.scss']
})
export class DetailsEventsComponent implements OnInit {

  _id:string;
  event: Events = {};
  fecha:string;
  precio:number = 0;
  iva: number = 0;
  consumption: number = 0;
  cantidad: FormControl = new FormControl(1,[Validators.required,Validators.min(1)]);
  can: number = this.cantidad.value;



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
      this.precio = this.precio;
      this.iva = this.precio * 0.19;
      this.consumption = this.precio * 0.08;
    }
  }

  onChange(event){
    this.can = event;
    this.precio = this.precio * this.can;
  }

  onClick(){
    if(this.cantidad.invalid){
      this.cantidad.markAllAsTouched();
      return ;
    }
    console.log("entre a validar");
  }

  comprar(event:Events){
    this.router.navigate(['/tickets'], {queryParams:{_id:event._id}});
  }

}
