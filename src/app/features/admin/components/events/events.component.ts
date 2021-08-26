import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  ngOnInit() {}

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.get('profile').setValue(file);
  }

  submitForm() {
    let headers = new HttpHeaders();
  //this is the important step. You need to set content type as null
    headers.set('Content-Type', null);
    headers.set('Accept', "multipart/form-data");
    let params = new HttpParams();

    var formData: FormData = new FormData();
    formData.append('date_event', this.form.get('date_event').value);
    formData.append('city_event', this.form.get('city_event').value);
    formData.append('direction_event', this.form.get('direction_event').value);
    formData.append('description_event',this.form.get('description_event').value);
    formData.append('presale', this.form.get('presale').value);
    formData.append('artists', this.form.get('artists').value);
    formData.append('profile', this.form.get('profile').value);

    console.log(this.form.get('profile').value);

    this.http.post('http://localhost:3000/eventss',formData,{params,headers}).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }
}
