import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CargarScriptsService } from './../../../../cargar-scripts.service';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.scss']
})
export class PlayListComponent implements OnInit {

  constructor(private _CargarScripts:CargarScriptsService) {
    _CargarScripts.Carga(["playlist"]);
   }

  ngOnInit(): void {
       
  }
}
