import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EventService} from '../../../../services/user-service/event.service';
import { HeaderService } from '../../../../services/header-service/header.service';

export interface eventData {
  date_event: string;
  city_event: string;
  direction_event: string;
  description_event: string;
  presale: string;
  artists: string;
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
  ];
  dataSource: MatTableDataSource<eventData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private eventService: EventService,
    private headerService: HeaderService
  ) {}

  async ngAfterViewInit(): Promise<any> {

    try {
      const result = await this.eventService.getEvents();
      this.eventsList = await result.users;
      console.log(result.users);
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
}
