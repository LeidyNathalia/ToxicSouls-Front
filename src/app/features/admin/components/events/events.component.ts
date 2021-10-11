import { Component, OnInit, NgModule, ViewChild, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators, } from '@angular/forms';
import { UploadService } from './upload.service';
import { Router } from '@angular/router';
import { Artist } from '../Artistas/interfaces/artist.interface';
import { ArtistService } from 'src/app/services/user-service/artist.service';
import { MatDialog } from '@angular/material/dialog';
import { EventService } from 'src/app/services/user-service/event.service';
import { Events } from 'src/app/features/home/components/eventos/interface/events.interface';
import { Presale } from '../../../home/components/eventos/interface/events.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  current_date: Date = new Date();
  form: FormGroup;
  SERVER_URL = 'http://18.224.229.72:3000/eventss';
  url_cloudinary_img_current: string;
  artistList: Artist[] = [];
  arrayItems: Presale[];

  nuevaFechaPreventa: FormControl = this.fb.control('', Validators.required);
  nuevaFechaInicioPreventa: FormControl = this.fb.control('', Validators.required);
  nuevoPrecioPreventa: FormControl = this.fb.control('', Validators.required);
  artistSelected: FormControl = this.fb.control('', Validators.required);

  @ViewChild('success') success: TemplateRef<any>;
  @ViewChild('error') error: TemplateRef<any>;
  @ViewChild('fecha_error') fecha_error: TemplateRef<any>;
  @ViewChild('fecha_error_presale') fecha_error_presale: TemplateRef<any>;
  @ViewChild('falta_fecha_evento') falta_fecha_evento: TemplateRef<any>;


  get presales() {
    return this.form.get('presales') as FormArray;
  }

  constructor(
    public fb: FormBuilder,
    private _uploadService: UploadService,
    private routes: Router,
    private artistService: ArtistService,
    private eventsService: EventService,
    private dialog: MatDialog,
    private datePipe: DatePipe
  ) {
    this.form = this.fb.group({
      demoArray: this.fb.array([]),
      date_event: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
      city_event: [
        '',
        [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)],
      ],
      direction_event: ['', [Validators.required]],
      description_event: [
        '',
        [Validators.required, Validators.pattern(/[A-Za-z0-9'\.\-\s\,]/)],
      ],
      //presale: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      presales: this.fb.array([], Validators.required),
      artists: ['', Validators.required],
      // artists: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      aforo: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      profile: [''],
    });
  }

  get artistsListArr() {
    return this.form.get('artistsList') as FormArray;
  }

  ngOnInit() {
    this.arrayItems = [];
    var current_date = new Date().toISOString().split('T')[0];
    document
      .getElementsByName('appo_date')[0]
      .setAttribute('min', current_date);

    //cargando el listado de artistas desde le back
    this.artistService.getAllArtists()
      .subscribe((resp) => {
        this.artistList = resp.artists;
      }, (error) => {
        this.artistList = [];
      })
  }

  files: File[] = [];

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onUpload() {
    //Scape empty array
    if (!this.files[0]) {
      alert('Primero sube una imagen, por favor');
    }
    //Upload my image to cloudinary
    const file_data = this.files[0];
    const data = new FormData();
    data.append('file', file_data);
    data.append('upload_preset', 'angular_cloudinary');
    data.append('cloud_name', 'toxic-souls');

    this._uploadService.uploadImage(data).subscribe(async (response) => {
      if (response) {
        console.log('url de img', response.url);
        this.url_cloudinary_img_current = await response.url;
        this.postData();
      }
    });
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.get('profile').setValue(file);
  }

  viewList() {
    this.routes.navigate(['/admin/list-event']);
  }

  postData() {
    const body: Events = {
      date_event: this.form.get('date_event').value,
      city_event: this.form.get('city_event').value,
      direction_event: this.form.get('direction_event').value,
      description_event: this.form.get('description_event').value,
      presales: this.arrayItems,
      artists: this.form.get('artists').value,
      capacity: this.form.get('aforo').value,
      flyer: this.url_cloudinary_img_current,
    };
    this.eventsService.addEvent(body)
      .subscribe((resp) => {
        this.form.reset();
        this.dialog.open(this.success);
        this.routes.navigate(['/admin/list-event']);
      }, (err) => {
        console.log(err);
        this.dialog.open(this.error);
      });
  }

  eliminarPreventa(i: number) {
    this.presales.removeAt(i);
    this.arrayItems.splice(i, 1);
    this.demoArray.removeAt(this.demoArray.length - 1);
  }

  comparePresales(dateNewPresale: Date): boolean {
    let flag = false;
    let pos = this.arrayItems.length - 1;
    if(dateNewPresale <= this.arrayItems[pos].date_end_presale){
      flag = true;
    }
    return flag;
  };

  agregarPreventan() {
    if (this.nuevaFechaPreventa.invalid && this.nuevoPrecioPreventa.invalid) {
      this.nuevoPrecioPreventa.markAllAsTouched();
      this.nuevaFechaPreventa.markAllAsTouched();
      return;
    }else if(this.form.get('date_event').value === ''){
      this.dialog.open(this.falta_fecha_evento);
      return;
    } else if (this.nuevaFechaPreventa.invalid) {
      this.nuevoPrecioPreventa.markAllAsTouched();
      return;
    } else if (this.nuevoPrecioPreventa.invalid) {
      this.nuevoPrecioPreventa.markAllAsTouched();
      return;
    } else if (this.nuevaFechaPreventa.value > this.form.get('date_event').value) {
      this.dialog.open(this.fecha_error);
      return;
    }else if(this.arrayItems.length > 0){
      let value = this.comparePresales(this.nuevaFechaPreventa.value);
      if(value){
        this.dialog.open(this.fecha_error_presale);
        return;
      }
    }
    this.arrayItems.push({
      date_end_presale: this.nuevaFechaPreventa.value,
      date_start_presale: this.nuevaFechaInicioPreventa.value,
      price_presale: this.nuevoPrecioPreventa.value,
    });
    this.presales.push(
      this.fb.control({
        date_end_presale: this.nuevaFechaPreventa.value,
        date_start_presale: this.nuevaFechaInicioPreventa.value,
        price_presale: this.nuevoPrecioPreventa.value,
      })
      );
      this.nuevaFechaPreventa.reset();
      this.nuevaFechaInicioPreventa.reset()
      this.nuevoPrecioPreventa.reset();
  }

  get demoArray() {
    return this.form.get('demoArray') as FormArray;
  }
}
