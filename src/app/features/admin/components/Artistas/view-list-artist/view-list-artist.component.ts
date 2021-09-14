import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';
import { ArtistService} from '../../../../../services/user-service/artist.service';
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

  constructor(
    private artistService: ArtistService,
    private routes: Router
  ) {

  }
  ngOnInit(): void {
    
  }

  // async ngAfterViewInit(): Promise<any> {
  //   try {
  //     const result = await this.artistService.getArtist();
  //     console.log('result', result);
  //     this.artistsList = await result.artists;
  //     console.log(result.artists);
  //     console.log(this.artistsList);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   this.dataSource = new MatTableDataSource(this.artistsList);
  //   this.dataSource.paginator = this.paginator;
  // }  

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

  getArtistById(row: any): string {
    const id = row._id;
    return id;
  }

  async delete(row: any): Promise<any> {
    try {
      //const header = this.headerService.createHeader(localStorage.getItem('token'));
      const deleteUser = await this.artistService.deleteArtist(row._id);
      const newList = await this.artistService.getArtist();
      for (let i = 0; i < this.artistsList.length; i++) {
        if (this.artistsList[i]['_id'] === row._id) {
          this.artistsList.splice(i, 1);
        }
      }
    } catch (error) {
      console.log(error);
    }
    this.dataSource = new MatTableDataSource(this.artistsList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  modify(row: any) {
    this.routes.navigate(['/admin/ModifyArtistComponent'],{queryParams:{id_artist:this.getArtistById(row)}});
  }

}
