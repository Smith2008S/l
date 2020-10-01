import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataGPS, DataGPSColumns } from '../dataGps.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PositionService {

  constructor(
    private http: HttpClient
  ) { }

  getAllData(): Observable<DataGPS> {
    return this.http.get<DataGPS>(environment.baseUrl + 'feeds.json?api_key=TTT5CQW4HHGW2PNL&results=10000');
  };

  getLastData(): Observable<DataGPSColumns> {
    return this.http.get<DataGPSColumns>(environment.baseUrl + 'feeds/last.json?api_key=TTT5CQW4HHGW2PNL');
  }
}
