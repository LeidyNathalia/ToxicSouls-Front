import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistComponent } from './components/artist/artist.component';
import { EventsComponent } from './components/events/events.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ViewListComponent } from './components/view-list/view-list.component';
import { RegisterEventComponent } from './components/register-event/register-event.component';

const routes: Routes = [
  {
    path: "", component: PrincipalComponent,
    children: [
      { path: "events", component: EventsComponent },
      { path: "artists", component: ArtistComponent },
      { path: "view-list", component: ViewListComponent},
      { path: "register-event", component: RegisterEventComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
