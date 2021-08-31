import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams, HttpClientModule } from '@angular/common/http';
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
  SERVER_URL = "http://localhost:3000/eventss";
  url_cloudinary_img_current;
  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private _uploadService: UploadService,
    private routes : Router
  ) {
    this.form = this.fb.group({
      date_event: ['',[
        Validators.required,
        Validators.pattern(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/)]],
      city_event: ['',[
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+$/)]],
      direction_event: ['',[
        Validators.required]],
      description_event: ['',[
        Validators.required,
        Validators.pattern(/[A-Za-z0-9'\.\-\s\,]/)]],
      presale: ['',[
        Validators.required,
        Validators.pattern(/^[0-9]+$/)]],
      artists:['',[
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+$/)]],
      aforo: ['',[
        Validators.required,
        Validators.pattern(/^[0-9]+$/)]],
      profile: ['']
    });
  }

  ngOnInit() {
    var current_date = new Date().toISOString().split('T')[0];
    document.getElementsByName("appo_date")[0].setAttribute('min', current_date);
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

    this._uploadService.uploadImage(data).subscribe((response) => {
      if (response) {
        console.log(response);
        console.log("url de img", response.url)
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
    console.log('aqui no entra')
    this.routes.navigate(['/admin/list-event']);

    
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('hola', 'mundo');

    //headers.set('Content-Type', 'application/json; charset=utf-8');
    //headers.set('Hola', 'mundo');
    //headers = headers.append('enctype', 'multipart/form-data');
    //headers.set('Accept', "multipart/form-data");
    let params = new HttpParams();

    const formData: FormData = new FormData();
    
    formData.append('date_event', this.form.get('date_event').value);
    formData.append('city_event', this.form.get('city_event').value);
    formData.append('direction_event', this.form.get('direction_event').value);
    formData.append('description_event',this.form.get('description_event').value);
    formData.append('presale', this.form.get('presale').value);
    formData.append('artists', this.form.get('artists').value);
    formData.append('artists', this.form.get('aforo').value);
    
    //formData.append('profile', this.form.get('profile').value);

    console.log(this.form.get('profile').value);
    //var aa = JSON.stringify(this.form.get('profile').value)
    let options = { headers: headers };
    const body = { date_event: this.form.get('date_event').value, city_event: this.form.get('city_event').value,
    direction_event: this.form.get('direction_event').value, description_event: this.form.get('description_event').value,
    presale: this.form.get('presale').value, artists: this.form.get('artists').value,capacity: this.form.get('aforo').value, flyer: this.url_cloudinary_img_current};
    this.http.post<any>('http://localhost:3000/api/events/add-event',body,options).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
    
   /*
    fetch('http://localhost:3000/eventss', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/text',
        'hola': 'mundi'
      },
      body: 'aaaaa'
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
  */
  }
}
