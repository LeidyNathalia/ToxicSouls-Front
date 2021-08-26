import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  form: FormGroup;

  // private httpHeaders = new HttpHeaders({
  //   'Content-Type': 'application/json',
  // });
  // private aa = JSON.stringify({ x: 'hola', y: 'mundo' });

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
      avatar: [null],
    })
  }

  ngOnInit() {}

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      avatar: file
    });
    this.form.get('avatar').updateValueAndValidity()
  }

  submitForm() {
    var formData: any = new FormData();
    formData.append('date_event', this.form.get('date_event').value);
    formData.append('city_event', this.form.get('city_event').value);
    formData.append('direction_event', this.form.get('direction_event').value);
    formData.append('description_event',this.form.get('description_event').value
    );
    formData.append('presale', this.form.get('presale').value);
    formData.append('artists', this.form.get('artists').value);
    formData.append('avatar', this.form.get('avatar').value);

    console.log(this.form.get('date_event').value);

    return this.http.post('http://localhost:3000/eventss', formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )

    // this.http
    //   .post('http://localhost:3000/api/eventss', formData, {
    //     headers: this.httpHeaders,
    //   })
    //   .subscribe(
    //     (response) => console.log(response),
    //     (error) => console.log(error)
    //   );
  }
}
