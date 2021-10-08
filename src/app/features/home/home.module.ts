import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PrincipalComponent } from './components/principal/principal.component';
import { SharedModule } from '../shared/shared.module';
import { SidebarHomeComponent } from './components/sidebar-home/sidebar-home.component';
import { HomeComponent } from './components/home/home.component';
import { ViewArtist } from './components/artists/viewArtist/viewArtist.component';
import { NgSimpleCarouselModule } from 'ng-simple-carousel';
import { PlayListComponent } from './components/play-list/play-list.component';
import { ViewEventsComponent } from './components/eventos/view-events/view-events.component';
import { TicketsComponent } from './components/tickets/tickets.component';
import { DetailsEventsComponent } from './components/eventos/details-events/details-events.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/about/about.component';

@NgModule({
  declarations: [
    PrincipalComponent,
    SidebarHomeComponent,
    HomeComponent,
    ViewArtist,
    PlayListComponent,
    ViewEventsComponent,
    TicketsComponent,
    DetailsEventsComponent,
    FooterComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgSimpleCarouselModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
