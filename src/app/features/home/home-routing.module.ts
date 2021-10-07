import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ViewArtist } from './components/artists/viewArtist/viewArtist.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { PlayListComponent } from './components/play-list/play-list.component';
import { ViewEventsComponent } from './components/eventos/view-events/view-events.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { DetailsEventsComponent } from './components/eventos/details-events/details-events.component';


const routes: Routes = [
  {
    path: "", component: PrincipalComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: "play-list", component: PlayListComponent},
      { path: "viewArtist", component: ViewArtist },
      { path: "events", component: ViewEventsComponent},
      { path: "tickets", component: TicketsComponent},
      { path: "DetailsEvents", component: DetailsEventsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
