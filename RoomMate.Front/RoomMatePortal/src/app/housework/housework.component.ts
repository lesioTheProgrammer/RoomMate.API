import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { HouseworkDto } from './dto/housework-dto';
import { WorkTypeEnum } from './dto/work-type-enum.enum';
import { MatDialog, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { AddHouseworkModalComponent } from './modal/add-housework-modal/add-housework-modal.component';
import { trigger, state, transition, animate, style } from '@angular/animations';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-housework',
  templateUrl: './housework.component.html',
  styleUrls: ['./housework.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class HouseworkComponent implements OnInit {

  public houseworkList: HouseworkDto[] = new Array<HouseworkDto>();
  // expanded table
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<HouseworkDto>;
  expandedElement: HouseworkDto | null;
  increasingNumber = 0; // added to manage index in the table
  loginHWComponent: string;

  columnsToDisplay = ['increasingNumber', 'houseWorkDate', 'username', 'description'];
  multiDim = [['increasingNumber', 'No.'], ['houseWorkDate', 'Kiedy'], ['username', 'Kto'],
  ['description', 'Opis']];

  constructor(public dashboardService: DashboardService, public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  // nie on init tylko dopiero po wybraniu mieszkania
  refreshFlatList(flatID: number, login: string) {
    this.dataSource = new MatTableDataSource();
    if (flatID != null) {
      this.dashboardService.getHouseWorkByFlatId(flatID, WorkTypeEnum.Clean).subscribe(response => {
        this.houseworkList = response;
        this.loginHWComponent = login;
        // new table
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  deleteItemFromDataSource(houseworkDto: HouseworkDto) {  //doing same as refresh but in more elegant way
    const index = this.dataSource.data.indexOf(houseworkDto);
    if (index !== -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = this.dataSource.data.slice(); // slice to update list
    }
  }

  chechModificaitonDate(creationDate: Date, modificationDate: Date): boolean{
    if (new Date(creationDate).getTime() != new Date(modificationDate).getTime()){ //compare
      return true;
    }
    return false;
  }

  edit(houseworkDto: HouseworkDto){
    const dialogRef = this.dialog.open(AddHouseworkModalComponent, {
      width: '450px',
      data: {
        houseworkDto: houseworkDto
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("Closed after subscribe")
    })
  }

  remove (houseworkDto: HouseworkDto){
    if (houseworkDto.id != null){
      this.dashboardService.removeHouseWork(houseworkDto).subscribe(response => {
        if (response){
          this.deleteItemFromDataSource(houseworkDto);
          this.openSnackBar('You removed the House Work', 'Ok');
        }
      })
    }
  }
}
