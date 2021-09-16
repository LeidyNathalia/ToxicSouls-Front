import { Artist } from '../../../../admin/components/Artistas/interfaces/artist.interface';
export interface Events{
  _id?:string,
  date_event?: string,
  city_event?: string,
  direction_event?: string,
  description_event?: string,
  presales?: [Presale],
  artists?: [Artist],
  flyer?: string,
  capacity?: number
}

export interface Presale{
  price_presale: string,
  date_end_presale: string
}


export interface ResponseEvents{
  status: string,
  events: Events[]
}


export interface responseEventById{

  status: string,
  message: string,
  event: Events
}
