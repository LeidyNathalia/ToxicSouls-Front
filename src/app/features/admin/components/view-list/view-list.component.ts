import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from '../../../../services/user-service/user.service';
import { HeaderService } from '../../../../services/header-service/header.service';

export interface UserData {
  cc: number;
  name: string;
  email: string;
}


@Component({
  selector: 'app-view-list',
  templateUrl: './view-list.component.html',
  styleUrls: ['./view-list.component.scss']
})
export class ViewListComponent implements AfterViewInit {

  usersList: UserData[];

  displayedColumns: string[] = ['cc', 'name', 'email', 'options'];
  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService,
    private headerService: HeaderService
  ) {

  }

  async ngAfterViewInit(): Promise<any> {

    try {
      const headers = this.headerService.createHeader(localStorage.getItem('token'));
      const result = await this.userService.getUsers(headers);
      this.usersList = await result.users;
      console.log(result.users);
      console.log(this.usersList);
    } catch (error) {
      console.log(error);
    }
    this.dataSource = new MatTableDataSource(this.usersList);
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

  edit(row: any) {
    console.log(row);
  }

  async delete(row: any): Promise<any> {
    try {
      const header = this.headerService.createHeader(localStorage.getItem('token'));
      const deleteUser = await this.userService.deleteUser(row._id, header);
      const newList = await this.userService.getUsers(header);
      for(let i = 0; i < this.usersList.length; i ++){
        if(this.usersList[i]['_id'] === row._id){
          this.usersList.splice(i, 1);
        }
      }
    } catch (error) {
      console.log(error);
    }
    this.dataSource = new MatTableDataSource(this.usersList);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}

