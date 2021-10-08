import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CargarScriptsService } from './../../../../cargar-scripts.service';


@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements AfterViewInit {

  constructor(private _CargarScripts:CargarScriptsService) {
    
   }

   async ngAfterViewInit(): Promise<any> {
    this._CargarScripts.Carga(["categorias"]);
    this._CargarScripts.Carga(["preguntasFrecuentes"]);
  }

  ngOnInit(): void {
 
  }

}
