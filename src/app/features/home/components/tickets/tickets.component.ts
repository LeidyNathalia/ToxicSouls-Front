import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Events, Presale } from '../eventos/interface/events.interface';
import { EventService } from '../../../../services/user-service/event.service';
import { DatePipe } from '@angular/common';
import { FormControl, Validators } from '@angular/forms';

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
  iva: number = 0;
  consumption: number = 0;
  cantidad: FormControl = new FormControl(1,[Validators.required,Validators.min(1)]);
  can: number = this.cantidad.value;
  precioUnit:number = 0;
  refPago:string = '';
  cont:number = 0;

  constructor(private actroutes: ActivatedRoute, private eventsService: EventService, private router:Router, private datePipe:DatePipe) {
    const fech = new Date();
    this.fecha = this.datePipe.transform(fech,'yyyy-MM-dd');
    this._id = this.actroutes.snapshot.queryParams._id;
  }

  ngOnInit(): void {
    this.eventsService.getEventById2(this._id)
    .subscribe((resp)=>{
      this.event = resp.event;
      console.log(this.event.presales)
      this.compareDate(this.event.presales);
    },(error)=>{
      this.router.navigate(['/events']);
    });
    this.refPago = this.generaNss();
  }

  generaNss():string {
    let result = '';
    const characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = 10;
    for (let i = 0; i < charactersLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  compareDate(presales:Presale[]){
    if(presales.length == 1){
      this.precio = parseInt(presales[0].price_presale);
    }else{
      const current_date = new Date();
      // for(let i = 0; i < presales.length; i ++){
      //   if(current_date <= this.convertPresaleDateToneFormat(presales[i])){
      //     console.log('fecha actual menor o igual a la fecha de la preventa')
      //   }
      // }
      if(current_date <= this.convertPresaleDateToneFormat(presales[0])){
        console.log('fecha actual menor o igual a la fecha de la preventa')
        this.precio = parseInt(presales[0].price_presale);
      }
    }
    this.precioUnit = parseInt(presales[0].price_presale);
    this.precio = this.precio*100;
    this.precioUnit = this.precioUnit*100;
    this.iva = this.precio * 0.19;
    this.consumption = this.precio * 0.08;
  }

  convertPresaleDateToneFormat(presale: Presale): Date{
    let date_p =  presale.date_end_presale.toLocaleString();
    let date = new Date(date_p);
    let dateToParse = date.toLocaleDateString();
    let data = dateToParse.split('/');
    let day = parseInt(data[0]) + 2;
    let newdate: string [] = [day.toString(), data[1], data[2]];
    let result = `${newdate[2]}-${newdate[1]}-${newdate[0]}`;
    let dateConvert = new Date(result);
    return dateConvert;
  }

  onChange(event: number){
    this.precio = this.precioUnit;
    if(event > this.can){
      this.can = event;
      this.precio = this.precio * this.can;
    }else{
      this.can = event;
      this.precio = this.precio * this.can;
    }
  }

  onClick(){
    if(this.cantidad.invalid){
      this.cantidad.markAllAsTouched();
      return ;
    }
    console.log("entre a validar");
  }

}
