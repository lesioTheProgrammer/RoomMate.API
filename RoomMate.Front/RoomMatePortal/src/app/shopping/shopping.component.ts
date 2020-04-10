import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { HouseworkDto } from '../housework/dto/housework-dto';
import { WorkTypeEnum } from '../housework/dto/work-type-enum.enum';
import { AddHouseworkModalComponent } from '../housework/modal/add-housework-modal/add-housework-modal.component';
import { MatDialog, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { trigger, style, transition, state, animate } from '@angular/animations';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ShoppingComponent implements OnInit {

  public houseworkList: HouseworkDto[] = new Array<HouseworkDto>();
  // expanded table
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<HouseworkDto>;
  expandedElement: HouseworkDto | null;
  increasingNumber = 0; // added to manage index in the table
  loginHWComponent: string;

  columnsToDisplay = ['increasingNumber', 'houseWorkDate', 'username', 'description', 'prices'];
  multiDim = [['increasingNumber', 'No.'], ['houseWorkDate', 'Kiedy'], ['username', 'Kto'],
  ['description', 'Opis'], ['prices', 'Koszty']];

  constructor(public dashboardService: DashboardService, public dialog: MatDialog,
    private _snackBar: MatSnackBar) { }

  ngOnInit() {

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000
    });
  }

  refreshFlatList(flatID: number, login: string) {
    this.dataSource = new MatTableDataSource();
    if (flatID != null) {
      this.dashboardService.getHouseWorkByFlatId(flatID, WorkTypeEnum.Shopping).subscribe(response => {
        this.houseworkList = response;
        this.loginHWComponent = login;
        // new table
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    }
  }

  chechModificaitonDate(creationDate: Date, modificationDate: Date): boolean{
    if (new Date(creationDate).getTime() != new Date(modificationDate).getTime()){ //compare
      return true;
    }
    return false;
  }



  edit(houseworkDto: HouseworkDto) {
    const dialogRef = this.dialog.open(AddHouseworkModalComponent, {
      width: "450px",
      data: {
        houseworkDto : houseworkDto
      }
    });
  }

  remove(houseworkDto: HouseworkDto) {
    debugger;
    if (houseworkDto.id != null){
      this.dashboardService.removeHouseWork(houseworkDto).subscribe(response => {
        if (response){
          this.deleteItemFromDataSource(houseworkDto);
          this.openSnackBar('You removed the House Work', 'Ok');
        }
      })

    }

  }

  deleteItemFromDataSource(houseworkDto: HouseworkDto) {
    const index = this.dataSource.data.indexOf(houseworkDto);
    if (index !== -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource.data = this.dataSource.data.slice(); // slice to update list
    }
  }

}
