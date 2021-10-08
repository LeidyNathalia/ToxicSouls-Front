import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './components/events/events.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { ViewListComponent } from './components/view-list/view-list.component';
import { RegisterEventComponent } from './components/register-event/register-event.component';
import { VieListEventsComponent } from './components/vie-list-events/vie-list-events.component';
import { ModifyEventComponent } from './components/modify-event/modify-event.component';
import { RegisterComponent } from '../admin/components/register/register.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AddArtistComponent } from './components/Artistas/add-artist/add-artist.component';
import { ViewListArtistComponent } from './components/Artistas/view-list-artist/view-list-artist.component';
import { ModifyArtistComponent } from './components/Artistas/modify-artist/modify-artist.component';
import { ReportComponent } from './components/report/report.component';
import { AboutComponent } from '../home/components/about/about.component';
import { HelpComponent } from './components/help/help.component';


const routes: Routes = [
  {
    path: "", component: PrincipalComponent,
    children: [
      { path: "events", component: EventsComponent },
      { path: "add-artists", component: AddArtistComponent },
      { path: "ViewListArtistComponent", component: ViewListArtistComponent},
      { path: "ModifyArtistComponent", component: ModifyArtistComponent },
      { path: "list", component: ViewListComponent},
      { path: "register-event", component: RegisterEventComponent},
      { path: "list-event", component: VieListEventsComponent },
      { path: "mod-event", component: ModifyEventComponent },
      { path: "register", component: RegisterComponent},
      { path: "edit-user", component: EditUserComponent},
      {path: 'report', component: ReportComponent},
      { path: "about", component: AboutComponent},
      { path: "help", component: HelpComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
