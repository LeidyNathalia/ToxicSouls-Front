import { Injectable } from '@angular/core';
import * as Config from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseGetTransactions } from 'src/app/features/home/components/eventos/interface/events.interface';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  path: string = `${Config.path}/transactions`;

  constructor(private http: HttpClient) { }


  getTransactions(): Observable<ResponseGetTransactions>{
    return this.http.get<ResponseGetTransactions>(`${this.path}`);
  }
}
