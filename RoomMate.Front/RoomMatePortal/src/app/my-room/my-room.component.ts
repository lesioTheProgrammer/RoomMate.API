import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { AddressFlatDto } from '../address/dto/address-dto';
import { FlatAddressService } from '../address/flat-address.service';
import { MatTableDataSource, MatPaginator, MatSnackBar, MatDialog } from '@angular/material';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { UserListDto } from '../user-controll-panel/dto/user-list-dto';
import { FlatListComponent } from '../flat-list/flat-list.component';
import { UserListComponent } from '../user-list/user-list.component';
import { FormGroup } from '@angular/forms';
import {Router} from '@angular/router';
import { MyRoomEditComponent } from '../my-room-edit/my-room-edit.component';



@Component({
  providers: [FlatListComponent],
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



  @Output()
    public flatDtoOutput = new EventEmitter<AddressFlatDto>();


  @ViewChild(MatPaginator) paginator: MatPaginator;

  users: UserListDto[] = [];

  selectedFlatId: number;
  dataSource: MatTableDataSource<AddressFlatDto>;
  columnsToDisplay = ['cityName', 'street', 'houseNumber', 'flatNumber', 'roleType'];
  expandedElement: AddressFlatDto | null;
  multiDim = [['cityName', 'City Name'], ['street', 'Street'], ['houseNumber', 'House Number'],
  ['flatNumber', 'Flat Number'], ['roleType', 'Role Type']];

  hasLeft: boolean;
  showChildEdit: boolean = false;
  constructor(
    public flatAddressService: FlatAddressService,
    private flatListComponent: FlatListComponent,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialog: MatDialog
  ) { }

  userName: string;
  refreshFlatId = new EventEmitter<Number>();

  @ViewChild (UserListComponent) userlistChild: UserListComponent;

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




  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
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

  viewUsers(flatid: number) {
    this.userlistChild.getUserList(flatid);
  }

  edit(flat: AddressFlatDto) { // pass selected flat id
      const dialogRef = this.dialog.open(MyRoomEditComponent, {
        width: '450px',
        data: {
          flatId: flat.id,
          userName: this.userName,
          active: flat.active,
          roleType: flat.roleType
        }
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
  }



  remove(flatDto: AddressFlatDto) {
    const loginCurrentUser = JSON.parse(localStorage.getItem("login"));
    flatDto.loggedUserName = loginCurrentUser;
    this.flatAddressService.removeFlat(flatDto)
    .subscribe(response => {
      if (response) {
        this.setFlatId(flatDto.id);
        this.deleteItemFromDataSource(flatDto);
        this.openSnackBar('You have left the flat', 'Ok');
      } else {
        this.openSnackBar('Something went wrong', 'Ok');
      }
    });
  }

  leave(flatDto: AddressFlatDto) {
    const loginCurrentUser = JSON.parse(localStorage.getItem("login"));
    flatDto.loggedUserName = loginCurrentUser;
    this.flatAddressService.leaveflat(flatDto)
     .subscribe(response => {
       if (response) {
         this.setFlatId(flatDto.id);
         // remove item from list:
         this.deleteItemFromDataSource(flatDto);
         this.openSnackBar('You have left the flat', 'Ok');
       } else {
        this.openSnackBar('Something went wrong', 'Ok');
       }
     });
  }

  deleteItemFromDataSource(flatDto: AddressFlatDto) {
    let index = this.dataSource.data.indexOf(flatDto);
    if (index !== -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = this.dataSource.data.slice(); //slice to update list
    }
  }


  setFlatId(selectedId: number) {
    this.selectedFlatId = selectedId;
    this.refreshFlatId.emit(this.selectedFlatId);
  }
}
