import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PrincipalComponent } from './components/principal/principal.component';
import { SharedModule } from '../shared/shared.module';
import { SidebarHomeComponent } from './components/sidebar-home/sidebar-home.component';
import { HomeComponent } from './components/home/home.component';
import { NewsComponent } from './components/news/news.component';
import { NgSimpleCarouselModule } from 'ng-simple-carousel';
import { PlayListComponent } from './components/play-list/play-list.component';
import { ViewEventsComponent } from './components/view-events/view-events.component';
import { TicketsComponent } from './components/tickets/tickets.component';

@NgModule({
  declarations: [
    PrincipalComponent,
    SidebarHomeComponent,
    HomeComponent,
    NewsComponent,
    PlayListComponent,
    ViewEventsComponent,
    TicketsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgSimpleCarouselModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
