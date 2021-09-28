import { Artist } from '../../../../admin/components/Artistas/interfaces/artist.interface';
export interface Events{
  _id?:string,
  date_event?: string,
  city_event?: string,
  direction_event?: string,
  description_event?: string,
  presales?: Presale[],
  artists?: [Artist],
  flyer?: string,
  capacity?: number
}

export interface Presale{
  price_presale: string,
  date_end_presale: Date
}


export interface ResponseEvents{
  status: string,
  events: Events[]
}

export interface ResponseCreateEvent{
  status: string,
  event: Events
}

export interface responseEventById{
  status: string,
  message: string,
  event: Events
}

export interface ResponseEditEvent{
  status: string,
  message: string,
  eventEdit: Events
}
