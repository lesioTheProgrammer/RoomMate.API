import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { HouseworkDto } from './dto/housework-dto';
import { WorkTypeEnum } from './dto/work-type-enum.enum';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { AddHouseworkModalComponent } from './modal/add-housework-modal/add-housework-modal.component';
import { trigger, state, transition, animate, style } from '@angular/animations';

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
  dataSource: MatTableDataSource<HouseworkDto>;
  expandedElement: HouseworkDto | null;

  increasingNumber: number = 0;

  columnsToDisplay = ['increasingNumber', 'houseWorkDate', 'username', 'description'];
  multiDim = [['increasingNumber', 'Number'], ['houseWorkDate', 'Kiedy'], ['username', 'Kto'],
  ['description', 'Opis']];



  constructor(public dashboardService: DashboardService, public dialog: MatDialog) { }

  ngOnInit() {

  }

  // nie on init tylko dopiero po wybraniu mieszkania
  refreshFlatList(flatID: number){
    this.dataSource = new MatTableDataSource();
    if (flatID != null) {
      this.dashboardService.getHouseWorkByFlatId(flatID, WorkTypeEnum.Clean).subscribe(response => {
        this.houseworkList = response;
        // new table
        this.dataSource.data = response;
        // foreach item in response add increasing number property?

        this.dataSource.paginator = this.paginator;
      });
    }
  }


  edit(houseworkDto: HouseworkDto){
    let xd = "";
    debugger;
  }












  // stachu
 // to sie dzieje wszystko w tabelce xD
  editHouseWork(houseworkDto: HouseworkDto){
    const dialogRef = this.dialog.open(AddHouseworkModalComponent, {
      width: "450px",
      data:{houseworkDto : houseworkDto }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }

}
