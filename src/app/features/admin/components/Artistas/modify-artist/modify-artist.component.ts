import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArtistService} from '../../../../../services/user-service/artist.service';
import { UploadServiceModify } from '../../modify-event/upload.service';
import { Artist } from '../interfaces/artist.interface';


@Component({
  selector: 'app-modify-artist',
  templateUrl: './modify-artist.component.html',
  styleUrls: ['./modify-artist.component.scss']
})

export class ModifyArtistComponent implements OnInit {
  form_artist: FormGroup;
  SERVER_URL = 'http://localhost:3000/eventss';
  url_cloudinary_img_current;
  redSocial: FormControl = this.fb.control('', []);
  artistsList: Artist[];
  id_edit: string;


  get redesSocialesArr() {
    return this.form_artist.get('social_networks') as FormArray;
  }

  constructor(private artistService: ArtistService,
    private fb: FormBuilder,
    private http: HttpClient,
    private actroutes: ActivatedRoute,
    private _uploadService: UploadServiceModify,
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

    this.id_edit= this.actroutes.snapshot.queryParams.id_artist;
    this.getArtist();
  }

  ngOnInit(): void {
  }

  async cargarInfo() {

    try {
      const result = await this.artistService.getArtist();
      console.log('result', result);
      this.artistsList = await result.events;
      console.log(result.events);
      console.log(this.artistsList);
    } catch (error) {
      console.log(error);
    }
  }

  async edit():Promise<any> {
    try{
      this.onUpload();
      setTimeout(async () => {
        console.log('editMethod', this.form_artist.value);
        const editEvent = await this.artistService.editArtist(this.id_edit,this.form_artist.value);
        const newList = await this.artistService.getArtist();
        this.routes.navigate(['/admin/ViewListArtistComponent']);
      }, 1500);
    }catch (error) {
      console.log(error)
    }
  }

  async getArtist():Promise<any>{
    const artist = await this.artistService.getArtistById(this.id_edit);
    this.form_artist.patchValue({name_artist:artist.artist.name_artist});
    this.form_artist.patchValue({nationality_artist:artist.artist.nationality_artist});
    console.log('social', artist.artist.social_networks)
    this.form_artist.patchValue({'social_networks': this.covertArrayToArrayControl(artist.artist.social_networks)});
    this.form_artist.patchValue({description_artist:artist.artist.description_artist});
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

  covertArrayToArrayControl(array: string[]){
    for(let value of array){
      this.redesSocialesArr.push(this.fb.control(value));
    }
  }

  onUpload() {
    //Scape empty array
    /* if (!this.files[0]) {
      alert('Primero sube una imagen, por favor');
    } */
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
