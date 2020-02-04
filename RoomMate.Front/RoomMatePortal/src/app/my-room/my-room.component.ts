import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { AddressFlatDto } from '../address/dto/address-dto';
import { FlatAddressService } from '../address/flat-address.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { RolesEnum } from '../user-controll-panel/dto/RolesEnum';
import { UserListDto } from '../user-controll-panel/dto/user-list-dto';
import { UserListComponent } from '../user-list/user-list.component';


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

  refreshFlatId = new EventEmitter<Number>();

  @ViewChild(MatPaginator) paginator: MatPaginator;

  users: UserListDto[] = [];

  selectedFlatId: number;
  dataSource: MatTableDataSource<AddressFlatDto>;
  columnsToDisplay = ['cityName', 'street', 'houseNumber', 'flatNumber', 'roleType'];
  expandedElement: AddressFlatDto | null;
  multiDim = [['cityName', 'City Name'], ['street', 'Street'], ['houseNumber', 'House Number'],
  ['flatNumber', 'Flat Number'], ['roleType', 'Role Type']];

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

    this.dataSource.paginator = this.paginator;
  }

  typeOf(value) {
    return typeof value;
  }

  getNameofRole(roleNumber: number) {
    if (roleNumber === 0) {
      return "Flatmate";
    }
    return "Flatmate Admin";
  }

  setFlatId(selectedId:number){
    this.selectedFlatId = selectedId;
    this.refreshFlatId.emit(this.selectedFlatId);
  }
  // co tu zrobic
  // mam flat id na kilk,
  // zawolac metode ktora zrobi requesta w child

  ViewUsers(flatid: number) {
    // this.userlistChild.getUserList(flatid);
  }

  Edit() {

  }

  Remove() {

  }

  Leave() {
    // go to myFlat and leave there.
  }




}



