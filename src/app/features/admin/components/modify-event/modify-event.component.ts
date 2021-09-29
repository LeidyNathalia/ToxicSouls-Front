import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UploadServiceModify } from './upload.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../../services/user-service/event.service';
import { Artist } from '../Artistas/interfaces/artist.interface';
import { ArtistService } from 'src/app/services/user-service/artist.service';
import { Events, Presale } from 'src/app/features/home/components/eventos/interface/events.interface';
import { MatDialog } from '@angular/material/dialog';

export interface eventData {
  date_event: string;
  city_event: string;
  direction_event: string;
  description_event: string;
  presale: string;
  artists: string;
  flyer: string;
}

@Component({
  selector: 'app-modify-event',
  templateUrl: './modify-event.component.html',
  styleUrls: ['./modify-event.component.scss'],
})
export class ModifyEventComponent implements OnInit {
  eventsList: eventData[];
  files: File[] = [];
  artistList: Artist[] = [];
  id_edit: string;
  event!: Events;
  displayedColumns: string[] = [
    'date_event',
    'city_event',
    'direction_event',
    'description_event',
    'presales',
    'artists',
    'capacity',
    'flyer',
  ];

  @ViewChild('success') success: TemplateRef<any>;
  @ViewChild('error') error: TemplateRef<any>;
  @ViewChild('fecha_error') fecha_error: TemplateRef<any>;
  @ViewChild('fecha_error_presale') fecha_error_presale: TemplateRef<any>;
  @ViewChild('falta_fecha_evento') falta_fecha_evento: TemplateRef<any>;


  form: FormGroup;
  SERVER_URL = 'http://18.224.229.72:3000/eventss';
  url_cloudinary_img_current;

  arrayItems: Presale[];

  nuevaFechaPreventa: FormControl = this.fb.control('', Validators.required);
  nuevoPrecioPreventa: FormControl = this.fb.control('', Validators.required);

  get presales() {
    return this.form.get('presales') as FormArray;
  }
  constructor(
    public fb: FormBuilder,
    private _uploadService: UploadServiceModify,
    private routes: Router,
    private actroutes: ActivatedRoute,
    private eventService: EventService,
    private artisService: ArtistService,
    private dialog: MatDialog
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
      presales: this.fb.array([], Validators.required),
      artists: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      flyer: [''],
    });
  }

  ngOnInit() {
    this.id_edit = this.actroutes.snapshot.queryParams.id;
    this.arrayItems = [];
    var current_date = new Date().toISOString().split('T')[0];
    document
      .getElementsByName('appo_date')[0]
      .setAttribute('min', current_date);

    this.artisService.getAllArtists()
      .subscribe((resp) => {
        this.artistList = resp.artists;
      });
    this.eventService.getEventById2(this.id_edit)
      .subscribe((resp) => {
        this.event = resp.event;

        this.form.patchValue({ date_event: this.event.date_event });
        this.form.patchValue({ city_event: this.event.city_event });
        this.form.patchValue({ direction_event: this.event.direction_event });
        this.form.patchValue({ description_event: this.event.description_event });
        this.form.patchValue({ artists: this.event.artists });
        this.form.patchValue({ artists: this.event.artists });
        this.arrayItems = this.event.presales;
        console.log(this.arrayItems.length, ' Tamaño arrayItems')
        this.addPresale(this.event.presales)
        this.form.patchValue({ capacity: this.event.capacity });
        this.form.get('flyer').setValue(this.event.flyer);
      });
  }

  edit(): void{
    this.eventService.editEvent2(this.id_edit, this.form.value)
      .subscribe((resp)=>{
        this.dialog.open(this.success);
        this.routes.navigate(['/admin/list-event']);
      }, (err)=>{
        this.dialog.open(this.error);
      })
  }

  onSelect(event: any) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  onUpload() {
    if (!this.files[0]) {
      this.edit();
    } else {
      const file_data = this.files[0];
      const data = new FormData();
      data.append('file', file_data);
      data.append('upload_preset', 'angular_cloudinary');
      data.append('cloud_name', 'toxic-souls');

      this._uploadService.uploadImage(data).subscribe((response) => {
        if (response) {
          console.log(response);
          console.log('url de img', response.url);
          this.url_cloudinary_img_current = response.url;
          this.form.get('flyer').setValue(response.url);
          this.edit();
        }
      });
    }
  }

  uploadFile(event: any) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.get('flyer').setValue(file);
  }

  viewList() {
    this.routes.navigate(['/admin/list-event']);
  }

  comparePresales(dateNewPresale: Date): boolean {
    let flag = false;
    let pos = this.arrayItems.length - 1;
    if (dateNewPresale <= this.arrayItems[pos].date_end_presale) {
      flag = true;
    }
    return flag;
  };

  agregarPreventa() {
    if (this.nuevaFechaPreventa.invalid && this.nuevoPrecioPreventa.invalid) {
      this.nuevoPrecioPreventa.markAllAsTouched();
      this.nuevaFechaPreventa.markAllAsTouched();
      return;
    } else if (this.form.get('date_event').value === '') {
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
    } else if (this.arrayItems.length > 0) {
      let value = this.comparePresales(this.nuevaFechaPreventa.value);
      if (value) {
        this.dialog.open(this.fecha_error_presale);
        return;
      }
    }
    this.arrayItems.push({
      date_end_presale: this.nuevaFechaPreventa.value,
      price_presale: this.nuevoPrecioPreventa.value,
    });
    this.presales.push(
      this.fb.control({
        date_end_presale: this.nuevaFechaPreventa.value,
        price_presale: this.nuevoPrecioPreventa.value,
      })
    );
    this.nuevaFechaPreventa.reset();
    this.nuevoPrecioPreventa.reset();
  }

  eliminarPreventa(i: number) {
    this.presales.removeAt(i);
    this.arrayItems.splice(i, 1);
    this.demoArray.removeAt(this.demoArray.length - 1);
  }

  get demoArray() {
    return this.form.get('demoArray') as FormArray;
  }

  addPresale(presalesC) {
    presalesC.forEach((presale) => {
      this.presales.push(
        this.fb.control({
          date_end_presale: presale.date_end_presale,
          price_presale: presale.price_presale,
        })
      );
    });
  }
}
