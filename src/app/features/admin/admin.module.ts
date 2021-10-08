import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PrincipalComponent } from './components/principal/principal.component';
import { EventsComponent } from './components/events/events.component';
import { SidebarAdminComponent } from './components/sidebar-admin/sidebar-admin.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ViewListComponent } from './components/view-list/view-list.component';
import { RegisterEventComponent } from './components/register-event/register-event.component';

//Ngx lib dropzone
import { NgxDropzoneModule } from 'ngx-dropzone';
import { VieListEventsComponent } from './components/vie-list-events/vie-list-events.component';
import { ModifyEventComponent } from './components/modify-event/modify-event.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AddArtistComponent } from './components/Artistas/add-artist/add-artist.component';
import { ModifyArtistComponent } from './components/Artistas/modify-artist/modify-artist.component';
import { ViewListArtistComponent } from './components/Artistas/view-list-artist/view-list-artist.component';
import { HelpComponent } from './components/help/help.component';
@NgModule({
  declarations: [
    PrincipalComponent,
    EventsComponent,
    SidebarAdminComponent,
    ViewListComponent,
    RegisterEventComponent,
    VieListEventsComponent,
    ModifyEventComponent,
    EditUserComponent,
    AddArtistComponent,
    ModifyArtistComponent,
    ViewListArtistComponent,
    HelpComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    HttpClientModule, NgxDropzoneModule
  ]
})
export class AdminModule { }
