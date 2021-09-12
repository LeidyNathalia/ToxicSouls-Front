import { Component, OnInit } from '@angular/core';
import {
  FormGroup, FormControl, Validators, FormBuilder, FormArray
} from '@angular/forms';

import { HttpClient, HttpParams, HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
//import { UploadService } from './upload.service';
import { Router } from '@angular/router';
import { ArtistService } from '../../../../../services/user-service/artist.service';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.scss']
})
export class AddArtistComponent implements OnInit {
  form_artist: FormGroup;
  SERVER_URL = 'http://localhost:3000/eventss';
  url_cloudinary_img_current;


  redSocial: FormControl = this.fb.control('', []);


  get redesSocialesArr() {
    return this.form_artist.get('social_networks') as FormArray;
  }


  constructor(private artistService: ArtistService,
    private fb: FormBuilder) {
    this.form_artist = new FormGroup({
      name_artist: new FormControl('', [
        Validators.required
      ]),
      nationality_artist: new FormControl('', [
        Validators.required

      ]),
      social_networks: this.fb.array([], Validators.required),

      description_artist: new FormControl('', [

      ])
    })
  }

  ngOnInit(): void {
  }


  registro() {
    if(this.form_artist.invalid){
      this.form_artist.markAllAsTouched();
      return;
    }
    console.log(this.form_artist.value);
    const data = this.form_artist.value;
    this.artistService.registerArtist(data)
      .subscribe((resp) => {
        console.log(resp);
      });
    this.form_artist.reset();
  }

  campoValido(campo: string) {
    return this.form_artist.controls[campo].errors &&
      this.form_artist.controls[campo].touched;
  }

  agregarRedSocial() {
    if (this.redSocial.invalid) {
      //this.redSocial.markAsTouched();
      return;
    }
    console.log(this.redSocial.value);
    this.redesSocialesArr.push(this.fb.control(this.redSocial.value, Validators.required));
    this.redSocial.reset();
  }

  eliminarRedSocial(i: number) {
    this.redesSocialesArr.removeAt(i);
  }
}
