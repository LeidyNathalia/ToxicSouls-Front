import { Component, OnInit, NgModule } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UploadService } from './upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  form: FormGroup;
  SERVER_URL = 'http://localhost:3000/eventss';
  url_cloudinary_img_current;

  arrayItems: {
    fecha: string;
    title: string;
  }[];

  nuevaFechaPreventa: FormControl = this.fb.control('', Validators.required);
  nuevoPrecioPreventa: FormControl = this.fb.control('', Validators.required);




  get presales(){
    return this.form.get('presales') as FormArray;
  }


  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private _uploadService: UploadService,
    private routes: Router
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
      presale: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      presales: this.fb.array([

      ], Validators.required),
      artists: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      aforo: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      profile: [''],
    });
  }

  ngOnInit() {
    this.arrayItems = [];
    var current_date = new Date().toISOString().split('T')[0];
    document
      .getElementsByName('appo_date')[0]
      .setAttribute('min', current_date);
  }

  files: File[] = [];

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
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

    this._uploadService
      .uploadImage(data)
      .subscribe((response) => {
        if (response) {
          console.log(response);
          console.log('url de img', response.url);
          this.url_cloudinary_img_current = response.url;
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

  submitForm() {
    this.routes.navigate(['/admin/list-event']);

    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('hola', 'mundo');

    let options = { headers: headers };
    this.postData(options);
  }

  postData(options) {
    this.onUpload();
    setTimeout(() => {
      console.log('se ejecuta?');
      const body = {
        date_event: this.form.get('date_event').value,
        city_event: this.form.get('city_event').value,
        direction_event: this.form.get('direction_event').value,
        description_event: this.form.get('description_event').value,
        presale: this.form.get('presale').value,
        artists: this.form.get('artists').value,
        capacity: this.form.get('aforo').value,
        flyer: this.url_cloudinary_img_current,
      };
      console.log('bodyyy', body);
      this.http
        .post<any>('http://localhost:3000/api/events/add-event', body, options)
        .subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
        );
    }, 1000);
  }

  /* agregarPreventa(){
    if(this.nuevaFechaPreventa.invalid){
      this.nuevaFechaPreventa.markAllAsTouched();
      return;
    }
    console.log(this.nuevaFechaPreventa.value);
    this.presales.push(this.fb.control(this.nuevaFechaPreventa.value, Validators.required));
    this.nuevaFechaPreventa.reset();
  } */

  eliminarPreventa(i: number){
    this.presales.removeAt(i);
    this.arrayItems.splice(i,1);
    this.demoArray.removeAt(this.demoArray.length - 1);
  }

  agregarPreventan(){
    if(this.nuevaFechaPreventa.invalid && this.nuevoPrecioPreventa.invalid){
      this.nuevoPrecioPreventa.markAllAsTouched();
      this.nuevaFechaPreventa.markAllAsTouched();
      return;
    }
    console.log(this.nuevaFechaPreventa.value, this.nuevoPrecioPreventa.value);
    this.arrayItems.push({fecha: this.nuevaFechaPreventa.value, title: this.nuevoPrecioPreventa.value});
    this.presales.push(this.fb.control({
      fecha: this.nuevaFechaPreventa.value,
      precio: this.nuevoPrecioPreventa.value
    }));
    this.nuevaFechaPreventa.reset();
    this.nuevoPrecioPreventa.reset();
    console.log(this.presales.controls);
  }



  //Lo que hizo Diego

  get demoArray() {
    return this.form.get('demoArray') as FormArray;
 }
  
}
