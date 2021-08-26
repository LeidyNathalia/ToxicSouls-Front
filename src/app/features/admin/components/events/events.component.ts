import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from "@angular/forms";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  form: FormGroup;

  constructor(
    public fb: FormBuilder,
    private http: HttpClient
  ) {
    this.form = this.fb.group({
      name: [''],
      avatar: [null]
    })
  }

  ngOnInit() { }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      avatar: file
    });
    this.form.get('avatar').updateValueAndValidity()
  }

  submitForm() {
    var formData: any = new FormData();
    formData.append("name", this.form.get('name').value);
    formData.append("avatar", this.form.get('avatar').value);

    this.http.post('http://localhost:3000/api/events/add-event', formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    )
  }

}
