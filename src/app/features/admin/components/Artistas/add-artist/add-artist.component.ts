import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators
} from '@angular/forms';

import { HttpClient, HttpParams, HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
//import { UploadService } from './upload.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.scss']
})
export class AddArtistComponent implements OnInit {
  form_artist: FormGroup;
  SERVER_URL = 'http://localhost:3000/eventss';
  url_cloudinary_img_current;

  constructor() {
    this.form_artist = new FormGroup({
      name_artist : new FormControl('', [
        Validators.required
      ]),
      country_artist : new FormControl('', [
        Validators.required
  
      ]),
      social_networks_artist : new FormControl('', [
        Validators.required
  
      ]),
      description_artist : new FormControl('', [
        Validators.required
  
      ])
    })
  }
  

  

  ngOnInit(): void {
  }

 /*  name_artist: {type: String, required: true},
    description_artist: {type: String, required: false},
    nationality_artist: {type: String, required: false},
    photo_artist: {type: String, required: false}
 */
}
