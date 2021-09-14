import { Component, OnInit, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpParams, HttpClientModule } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { UploadServiceModify } from './upload.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EventService} from '../../../../services/user-service/event.service';


export interface eventData {
  date_event: string;
  city_event: string;
  direction_event: string;
  description_event: string;
  presale: string;
  artists: string;
  flyer: string;
}

@Component({
  selector: 'app-modify-event',
  templateUrl: './modify-event.component.html',
  styleUrls: ['./modify-event.component.scss']
})
export class ModifyEventComponent implements OnInit {
  eventsList: eventData[];
  id_edit: string;
  displayedColumns: string[] = [
    'date_event',
    'city_event',
    'direction_event',
    'description_event',
    'presale',
    'artists',
    'capacity',
    'flyer'];

  form: FormGroup;
  SERVER_URL = "http://localhost:3000/eventss";
  url_cloudinary_img_current;
  constructor(
    public fb: FormBuilder,
    private http: HttpClient,
    private _uploadService: UploadServiceModify,
    private routes : Router,
    private actroutes: ActivatedRoute,
    private eventService: EventService
  ) {
    this.form = this.fb.group({
      date_event: ['',[
        Validators.required,
        Validators.pattern(/^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/)]],
      city_event: ['',[
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+$/)]],
      direction_event: ['',[
        Validators.required]],
      description_event: ['',[
        Validators.required,
        Validators.pattern(/[A-Za-z0-9'\.\-\s\,]/)]],
      presale: ['',[
        Validators.required,
        Validators.pattern(/^[0-9]+$/)]],
      artists:['',[
        Validators.required,
        Validators.pattern(/^[a-zA-Z]+$/)]],
      capacity: ['',[
        Validators.required,
        Validators.pattern(/^[0-9]+$/)]],
      flyer: ['']
    });
    this.id_edit= this.actroutes.snapshot.queryParams.id;
    this.getEvent();
  }

  ngOnInit() {
    var current_date = new Date().toISOString().split('T')[0];
    document.getElementsByName("appo_date")[0].setAttribute('min', current_date);
  }

  async cargarInfo() {

    try {
      const result = await this.eventService.getEvents();
      console.log('result', result);
      this.eventsList = await result.events;
      console.log(result.events);
      console.log(this.eventsList);
    } catch (error) {
      console.log(error);
    }
  }

  async edit():Promise<any> {
    try{
      this.onUpload();
      setTimeout(async () => {
        console.log('editMethod', this.form.value);
        const editEvent = await this.eventService.editEvent(this.id_edit,this.form.value);
        const newList = await this.eventService.getEvents();
        this.routes.navigate(['/admin/list-event']);
      }, 1000);
    }catch (error) {
      console.log(error)
    }
  }

  async getEvent():Promise<any>{
    const event = await this.eventService.getEventById(this.id_edit);
    this.form.patchValue({date_event:event.event.date_event});
    this.form.patchValue({city_event:event.event.city_event});
    this.form.patchValue({direction_event:event.event.direction_event});
    this.form.patchValue({description_event:event.event.description_event});
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
    this.routes.navigate(['/admin/list-event']);
  }

}
