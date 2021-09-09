import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService} from '../../../../../services/user-service/artist.service';
import { UploadServiceModify } from '../../modify-event/upload.service';

export interface artistData {
  name_artist,
  country_artist,
  social_networks_artist,
  description_artist,
  flyer: string;
}

@Component({
  selector: 'app-modify-artist',
  templateUrl: './modify-artist.component.html',
  styleUrls: ['./modify-artist.component.scss']
})

export class ModifyArtistComponent implements OnInit {
  artistsList: artistData[];
  id_edit: string;
  url_cloudinary_img_current;

  form = new FormGroup({
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
    private _uploadService: UploadServiceModify,
    private routes : Router,
    private actroutes: ActivatedRoute,
    private artistService: ArtistService
  ) { 
    this.id_edit= this.actroutes.snapshot.queryParams.id;
    this.getArtist();
  }

  ngOnInit(): void {
  }

  async cargarInfo() {

    try {
      const result = await this.artistService.getArtist();
      console.log('result', result);
      this.artistsList = await result.artists;
      console.log(result.artists);
      console.log(this.artistsList);
    } catch (error) {
      console.log(error);
    }
  }

  async edit():Promise<any> {
    try{
      this.onUpload();
      setTimeout(async () => {
        console.log('editMethod', this.form.value);
        const editEvent = await this.artistService.editArtist(this.id_edit,this.form.value);
        const newList = await this.artistService.getArtist();
        this.routes.navigate(['/admin/ViewListArtistComponent']);
      }, 1000);
    }catch (error) {
      console.log(error)
    }
  }

  async getArtist():Promise<any>{
    const event = await this.artistService.getArtistById(this.id_edit);
    // this.form.patchValue({date_event:event.event.date_event});
    // this.form.patchValue({city_event:event.event.city_event});
    // this.form.patchValue({direction_event:event.event.direction_event});
    // this.form.patchValue({description_event:event.event.description_event});
    // this.form.patchValue({presale:event.event.presale});
    // this.form.patchValue({artists:event.event.artists});
    // this.form.patchValue({capacity:event.event.capacity});
    // console.log("valor fecha",event.event.date_event )
    // console.log("form by id",event);
    // console.log("event",event.event);
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
        this.form.get('flyer').setValue(response.url);
      }
    });
  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.get('flyer').setValue(file);
  }

  viewList() {
    this.routes.navigate(['/admin/ViewListArtistComponent']);
  }
}
