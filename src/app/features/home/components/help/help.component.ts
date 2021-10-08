import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CargarScriptsService } from './../../../../cargar-scripts.service';


@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements AfterViewInit {

  constructor(private _CargarScripts:CargarScriptsService) {
    _CargarScripts.Carga(["categorias"]);
    _CargarScripts.Carga(["preguntasFrecuentes"]);
   }

  ngAfterViewInit(): void {
    
  }

  ngOnInit(): void {
  }

}
