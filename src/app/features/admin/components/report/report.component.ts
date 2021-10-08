import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Transaction } from 'src/app/features/home/components/eventos/interface/events.interface';
import { TransactionService } from 'src/app/services/ticket-service/transaction.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  transactionsList: Transaction[]

  displayedColumns: string[] = [
    'statusPayment',
    'nameClient',
    'emailClient',
    'docId',
    'phoneNumber',
    'TotalPayment',
    'paymentMethod'
  ];

  dataSource: MatTableDataSource<Transaction>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.transactionService.getTransactions()
      .subscribe((resp) => {
        console.log(resp)
        this.transactionsList = resp.transactions;
        this.dataSource = new MatTableDataSource(this.transactionsList);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }, (err) => {
        console.log(err)
        this.transactionsList = []
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
