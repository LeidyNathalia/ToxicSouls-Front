import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, FormArray} from '@angular/forms';
//import { UploadService } from './upload.service';
import { Router } from '@angular/router';
import { ArtistService } from '../../../../../services/user-service/artist.service';
import { UploadService } from '../../events/upload.service';

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
    private fb: FormBuilder,
    private http: HttpClient,
    private _uploadService: UploadService,
    private routes: Router) {
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
    this.form_artist.get('photo_artist').setValue(file);
  }

  registro() {

    if(this.form_artist.invalid){
      this.form_artist.markAllAsTouched();
      return;
    }
    console.log(this.form_artist.value);
    const data = this.form_artist.value;
    this.onUpload();

    setTimeout(() => {
    const body = {
      name_artist: this.form_artist.get('name_artist').value,
      nationality_artist: this.form_artist.get('nationality_artist').value,
      social_networks: this.form_artist.get('social_networks').value,
      description_artist: this.form_artist.get('description_artist').value,
      photo_artist: this.url_cloudinary_img_current
    };
    console.log("url en enviar" , this.url_cloudinary_img_current);
    this.artistService.registerArtist(body)
      .subscribe((resp) => {
        console.log(resp);
      });
    this.form_artist.reset();
  }, 2500);
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
