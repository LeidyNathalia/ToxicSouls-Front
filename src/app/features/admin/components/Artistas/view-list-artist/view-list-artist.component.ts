import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface ArtistData {
  id: string;
  nameArtist: string;
  countryArtist: string;
  socialNetworks: string;
  description: string;
}
@Component({
  selector: 'app-view-list-artist',
  templateUrl: './view-list-artist.component.html',
  styleUrls: ['./view-list-artist.component.scss']
})
export class ViewListArtistComponent implements OnInit {

  artistsList: ArtistData[];

  displayedColumns: string[] = ['Id', 'Nombre', 'Pais', 'Redes sociales', 'Descripción'];
  dataSource: MatTableDataSource<ArtistData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor() {

  }

  ngAfterViewInit() {
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

  ngOnInit(): void {
  }

}
