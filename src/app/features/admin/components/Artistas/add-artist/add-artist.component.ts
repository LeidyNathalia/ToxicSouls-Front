import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { UploadService } from '../../events/upload.service';


@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.scss']
})
export class AddArtistComponent implements OnInit {
  form: FormGroup;
  url_cloudinary_img_current;

  form_artist = new FormGroup({
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

  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private _uploadService: UploadService,
    private routes: Router
  ) {
   
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
    this.form.get('profile').setValue(file);
  }

  submitForm() {
    this.routes.navigate(['/admin/ViewListArtistComponent']);

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
        name_artist: this.form.get('name_artist').value,
        country_artist: this.form.get('country_artist').value,
        social_networks_artist: this.form.get('social_networks_artist').value,
        description_artist: this.form.get('description_artist').value,
        flyer: this.url_cloudinary_img_current,
      };
      console.log('bodyyy', body);
      this.http
        .post<any>('http://localhost:3000/api/events/add-artist', body, options)
        .subscribe(
          (response) => console.log(response),
          (error) => console.log(error)
        );
    }, 1000);
  }


}
