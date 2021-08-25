import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { PrincipalComponent } from './components/principal/principal.component';
import { SharedModule } from '../shared/shared.module';
import { SidebarHomeComponent } from './components/sidebar-home/sidebar-home.component';
import { EventsComponent } from './components/events/events.component';
import { NewsComponent } from './components/news/news.component';
import { NgSimpleCarouselModule } from 'ng-simple-carousel';


@NgModule({
  declarations: [
    PrincipalComponent,
    SidebarHomeComponent,
    EventsComponent,
    NewsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgSimpleCarouselModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
