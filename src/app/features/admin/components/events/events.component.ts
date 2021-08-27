import { Component, OnInit, NgModule } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpParams, HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  form: FormGroup;
  SERVER_URL = "http://localhost:3000/eventss";

  constructor(
    public fb: FormBuilder,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      date_event: [''],
      city_event: [''],
      direction_event: [''],
      description_event: [''],
      presale: [''],
      artists: [''],
      profile: ['']
    });
  }

  ngOnInit() {
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.get('profile').setValue(file);
  }

  submitForm() {
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
    
    //formData.append('profile', this.form.get('profile').value);

    console.log(this.form.get('profile').value);
    //var aa = JSON.stringify(this.form.get('profile').value)
    let options = { headers: headers };
    const body = { date_event: this.form.get('date_event').value, city_event: this.form.get('city_event').value,
    direction_event: this.form.get('direction_event').value, description_event: this.form.get('description_event').value,
    presale: this.form.get('presale').value, artists: this.form.get('artists').value};
    this.http.post<any>('http://localhost:3000/eventss',body,options).subscribe(
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
