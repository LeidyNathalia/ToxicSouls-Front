import { Artist } from '../../../../admin/components/Artistas/interfaces/artist.interface';
export interface Events{

  date_event: string,
  city_event: string,
  direction_event: string,
  description_event: string,
  presale: [string],
  artists: [Artist],
  flyer: string,
  capacity: number
}


export interface ResponseEvents{
  status: string,
  events: Events[]
}
