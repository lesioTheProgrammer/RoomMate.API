import { Component, OnInit, ViewChild } from '@angular/core';
import { AddressFlatDto } from '../address/dto/address-dto';
import { FlatAddressService } from '../address/flat-address.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-my-room',
  templateUrl: './my-room.component.html',
  styleUrls: ['./my-room.component.css'],


  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MyRoomComponent implements OnInit {


  @ViewChild(MatPaginator) paginator: MatPaginator;

  dataSource: MatTableDataSource<AddressFlatDto>;
  columnsToDisplay = ['City Name', 'Street', 'House Number', 'Flat Number'];
  expandedElement: AddressFlatDto | null;

  constructor(
    public flatAddressService: FlatAddressService
  ) { }

  userName: string;


  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.userName = JSON.parse(localStorage.getItem("login"));
    // get all flats by userID on init (userflats)
    this.flatAddressService.getAllFlats(this.userName).subscribe( response => {
      if (response.length > 0 && response[0].id !== 0) {
         this.dataSource.data = response;
      }
    });

  }


}



