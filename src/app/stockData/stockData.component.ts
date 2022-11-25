import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'stock-data',
  templateUrl: './stockData.component.html',
  styleUrls: ['./stockData.component.scss']
})
export class StockData implements OnInit {
  dateInput: any;
  stockData: Data;
  isNoData = false;
  isRequestComplete = false;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
  }

  searchStockDataByDate() {
    this.isNoData = false;
    this.isRequestComplete = false;
    if(this.dateInput != '') {
      this.fetchStockDataByDate(this.dateInput).subscribe( resData => {
        this.isRequestComplete = true;
        if(resData.data.length != 0){
          this.stockData = resData.data[0];
        } else {
          this.isNoData = true;
        }
      });
    }
  }

  fetchStockDataByDate(date) : Observable<ApiResponse> {
    const url = `https://jsonmock.hackerrank.com/api/stocks?date=` + date;
    return this.http.get<ApiResponse>(url).pipe(map(data => data));
  }
}

interface Data {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: Data[];
}
