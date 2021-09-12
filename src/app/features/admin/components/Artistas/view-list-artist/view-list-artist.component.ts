import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ArtistService } from 'src/app/services/user-service/artist.service';
import { Artist } from '../interfaces/artist.interface';

@Component({
  selector: 'app-view-list-artist',
  templateUrl: './view-list-artist.component.html',
  styleUrls: ['./view-list-artist.component.scss']
})
export class ViewListArtistComponent implements OnInit {
  // export interface Artist {
  //   name_artist: string,
  //   description_artist: string,
  //   nationality_artist: string,
  //   social_networks: [string],
  //   photo_artist: string
  // };
  artistsList: Artist[];

  displayedColumns: string[] = ['name_artist', 'nationality_artist', 'social_networks', 'description_artist', 'options'];
  dataSource: MatTableDataSource<Artist>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private artistService: ArtistService) {

  }

  ngAfterViewInit() {
    this.artistService.getAllArtists()
    .subscribe((resp)=>{
      this.artistsList = resp.artists;
      console.log(this.artistsList);
      this.dataSource = new MatTableDataSource(this.artistsList);
      this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    });
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
