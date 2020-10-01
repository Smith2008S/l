import { DataGPSColumns } from './dataGPS.model';
import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { PositionService } from './positionService/position.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {

  constructor(
    private positionService: PositionService
  ) { }
  displayedColumns: string[] = ['Entrada', 'Fecha', 'Hora', 'Posición'];
  dataLast: DataGPSColumns;
  readyData = false;
  DataGPSColumn: DataGPSColumns[] = [];
  dataSourceElement = new MatTableDataSource<DataGPSColumns>(this.DataGPSColumn);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.fetchAllPosition();
    this.fetchLastPosition();
  }

  ngDoCheck(): void {
    if (this.DataGPSColumn.length !== 0 && !this.readyData) {
      this.readyData = true;
      if (!this.DataGPSColumn.find(data => data.entry_id === this.dataLast.entry_id)) {
        this.DataGPSColumn.push(this.dataLast);
        this.DataGPSColumn = this.DataGPSColumn.sort((a: DataGPSColumns, b: DataGPSColumns): any => b.entry_id - a.entry_id);
      }
      this.dataSourceElement = new MatTableDataSource<DataGPSColumns>(this.DataGPSColumn);
      this.dataSourceElement.paginator = this.paginator;
      this.dataSourceElement.sort = this.sort;
      this.updateData();
    }
  }

  updateData(): void {
    setTimeout(() => {
      this.fetchLastPosition();
      this.readyData = false;
    }, 10000);
  }

  fetchAllPosition(): void {
    this.positionService.getAllData().subscribe(
      data => {
        this.DataGPSColumn = data.feeds;
        this.DataGPSColumn = data.feeds.sort((a: DataGPSColumns, b: DataGPSColumns): any => b.entry_id - a.entry_id);
      }
    )
  }

  fetchLastPosition(): void {
    this.positionService.getLastData().subscribe(
      data => {
        this.dataLast = data;
      }
    )
  }
}
