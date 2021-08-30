import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistComponent } from './components/artist/artist.component';
import { EventsComponent } from './components/events/events.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ViewListComponent } from './components/view-list/view-list.component';
import { RegisterEventComponent } from './components/register-event/register-event.component';
import { VieListEventsComponent } from './components/vie-list-events/vie-list-events.component';
import { ModifyEventComponent } from './components/modify-event/modify-event.component';
import { RegisterComponent } from '../admin/components/register/register.component';

const routes: Routes = [
  {
    path: "", component: PrincipalComponent,
    children: [
      { path: "events", component: EventsComponent },
      { path: "artists", component: ArtistComponent },
      { path: "list", component: ViewListComponent},
      { path: "register-event", component: RegisterEventComponent},
      { path: "list-event", component: VieListEventsComponent },
      { path: "modify-event", component: ModifyEventComponent },
      { path: "register", component: RegisterComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
