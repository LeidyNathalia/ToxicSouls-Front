import { AfterViewInit, Component, ViewChild, TemplateRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EventService } from '../../../../services/user-service/event.service';
import { HeaderService } from '../../../../services/header-service/header.service';
import { Router } from '@angular/router';
import { Events } from 'src/app/features/home/components/eventos/interface/events.interface';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-vie-list-events',
  templateUrl: './vie-list-events.component.html',
  styleUrls: ['./vie-list-events.component.scss'],
})
export class VieListEventsComponent implements AfterViewInit {
  eventsList: Events[];
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
  dataSource: MatTableDataSource<Events>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('success') success: TemplateRef<any>;
  @ViewChild('error') error: TemplateRef<any>;

  nombreEvento: string = '';

  constructor(
    private eventService: EventService,
    private routes: Router,
    private dialog: MatDialog
    ) {}

  ngAfterViewInit() {
    this.eventService.getEvents2()
      .subscribe((resp)=>{
        this.eventsList = resp.events;
        console.log(resp.events);
        this.dataSource = new MatTableDataSource(this.eventsList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, (err)=>{
        this.eventsList = [];
      });
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

  async delete(row: any) {
    this.eventService.deleteEvent2(row._id)
      .subscribe((resp)=> {
        this.dialog.open(this.success);
      }, (err)=>{
        this.dialog.open(this.error);
      });

      for (let i = 0; i < this.eventsList.length; i++) {
        if (this.eventsList[i]['_id'] === row._id) {
          this.eventsList.splice(i, 1);
        }
      }

    this.dataSource = new MatTableDataSource(this.eventsList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  modify(row: any) {
    this.routes.navigate(['/admin/mod-event'],{queryParams:{id:this.getEventById(row)}});
  }
}
