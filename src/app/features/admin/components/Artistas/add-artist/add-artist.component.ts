import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.scss']
})
export class AddArtistComponent implements OnInit {

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

  constructor() {

  }

  ngOnInit(): void {
  }


}
