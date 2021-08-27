import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PrincipalComponent } from './components/principal/principal.component';
import { EventsComponent } from './components/events/events.component';
import { SidebarAdminComponent } from './components/sidebar-admin/sidebar-admin.component';
import { ArtistComponent } from './components/artist/artist.component';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ViewListComponent } from './components/view-list/view-list.component';
import { RegisterEventComponent } from './components/register-event/register-event.component';

//Ngx lib dropzone
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
  declarations: [
    PrincipalComponent,
    EventsComponent,
    SidebarAdminComponent,
    ArtistComponent,
    ViewListComponent,
    RegisterEventComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule,
    HttpClientModule, NgxDropzoneModule
  ]
})
export class AdminModule { }
