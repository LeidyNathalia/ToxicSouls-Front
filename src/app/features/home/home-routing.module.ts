import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NewsComponent } from './components/news/news.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { PlayListComponent } from './components/play-list/play-list.component';
import { ViewEventsComponent } from './components/view-events/view-events.component';
import { TicketsComponent } from './components/tickets/tickets.component';


const routes: Routes = [
  {
    path: "", component: PrincipalComponent,
    children: [
      { path: "", component: HomeComponent },
      { path: "play-list", component: PlayListComponent},
      { path: "news", component: NewsComponent },
      { path: "events", component: ViewEventsComponent},
      { path: "tickets", component: TicketsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
