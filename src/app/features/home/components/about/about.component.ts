import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {

  longText = 'Toxic Souls nace a finales del año 2016 con la misión de transmitir la cultura electrónica underground en el departamento de Boyacá, siendo la ciudad de Tunja la cuna y el lugar de origen de este movimiento. Toxic souls se manifiesta por primera vez el 20 de Enero de 2017 a las afueras de la ciudad de Tunja en una propuesta RAVE que marco en la escena local el comienzo de un proyecto que impulsado por el amor a la música prometía el inicio de una nueva propuesta que luchaba por llevar al publico lo mejor de la escena underground local, nacional e internacional de una manera en la cual se lograra apreciar realmente la majestuosidad de estos sonidos, haciendo énfasis en la calidad, responsabilidad, respeto, y la desestigmatización que tanto rodea este movimiento. Siendo el amor por la música el principal motor, Toxic Souls ataco por segunda vez al poco tiempo del primer RAVE, el 11 de marzo de 2017 presento en Boyacá: Hardcodelia Showcase + nuestro primer artista de talla internacional, un estandarte de la cultura RAVE en Europa, y que su larga carrera y experiencia habla por si sola, desde República Checa arribo a Tunja SUBURBASS a.k.a WOLFENOIZ presentando sus dos proyectos que marcaron un evento sin precedentes en el departamento de Boyacá Toxic Souls cumple su primer año de vida artística el 20 de Enero de 2018 presentando su primer aniversario nuevamente con un artista de talla internacional, esta vez nos visitó el Showcase de Klan 31 + MR.MADNESS quien es considerado el Padrino del Hardcore en Eslovenia, su país natal, y siendo parte del sello de Hardcore mas antiguo y respetado en el mundo: Industrial Strength Records que se tomo por primera vez Boyacá.Cerrando un año de grandes logros y una acogida enorme Toxic Souls decide viajar a nuevas tierras y como nueva misión lucha por esparcir este sonido en todos los rincones posibles, el 28 de Marzo de 2018 Toxic Souls llega por primera vez a Bogotá donde de la mano de Hardcodelia presentaron: THE ANUNNAKI + D.O.M en un RAVE que sin duda quedo marcado en la historia de eventos en Colombia donde se celebro la 50 edición de Hardcodelia junto con todo el mejor talento local.Actualmente Toxic Souls liderado por Julián Perilla a.k.a GHOSTBEAT lucha por expandir y seguir construyendo en Colombia una de las más grandes plazas de este movimiento a nivel mundial, y comenzando un proceso de creación de futuro sello discográfico.';


  constructor() {}

  ngOnInit(): void {
  }

}
