import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EventService } from '../../../../services/user-service/event.service';
import { HeaderService } from '../../../../services/header-service/header.service';
import { Router } from '@angular/router';
import { Artist } from '../Artistas/interfaces/artist.interface';

export interface eventData {
  date_event: string;
  city_event: string;
  direction_event: string;
  description_event: string;
  presales: any [];
  artists: Artist [];
  capacity: Number;
}

@Component({
  selector: 'app-vie-list-events',
  templateUrl: './vie-list-events.component.html',
  styleUrls: ['./vie-list-events.component.scss'],
})
export class VieListEventsComponent implements AfterViewInit {
  eventsList: eventData[];
  displayedColumns: string[] = [
    'date_event',
    'city_event',
    'direction_event',
    'description_event',
    'presale',
    'artists',
    'capacity',
    'options',
  ];
  dataSource: MatTableDataSource<eventData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private eventService: EventService,
    private routes: Router,
    private headerService: HeaderService
  ) {}

  async ngAfterViewInit(): Promise<any> {
    try {
      const result = await this.eventService.getEvents();
      console.log('result', result);
      this.eventsList = await result.events;
      console.log(result.events);
      console.log(this.eventsList);
    } catch (error) {
      console.log(error);
    }
    this.dataSource = new MatTableDataSource(this.eventsList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getEventById(row: any): string {
    const id = row._id;
    return id;
  }

  async delete(row: any): Promise<any> {
    try {
      //const header = this.headerService.createHeader(localStorage.getItem('token'));
      const deleteUser = await this.eventService.deleteEvent(row._id);
      const newList = await this.eventService.getEvents();
      for (let i = 0; i < this.eventsList.length; i++) {
        if (this.eventsList[i]['_id'] === row._id) {
          this.eventsList.splice(i, 1);
        }
      }
    } catch (error) {
      console.log(error);
    }
    this.dataSource = new MatTableDataSource(this.eventsList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  modify(row: any) {
    this.routes.navigate(['/admin/mod-event'],{queryParams:{id:this.getEventById(row)}});
  }
}
