import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './components/events/events.component';
import { NewsComponent } from './components/news/news.component';
import { PrincipalComponent } from './components/principal/principal.component';

const routes: Routes = [
  {
    path: "", component: PrincipalComponent,
    children: [
      // { path: "", component: EventsComponent },
      { path: "", component: EventsComponent },
      // { path: "play-list", component: PlayListComponent}
      { path: "news", component: NewsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
