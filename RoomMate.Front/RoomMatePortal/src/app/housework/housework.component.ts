import { Component, OnInit, Input } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { HouseworkDto } from './dto/housework-dto';
import { WorkTypeEnum } from './dto/work-type-enum.enum';
import { MatDialog } from '@angular/material';
import { AddHouseworkModalComponent } from './modal/add-housework-modal/add-housework-modal.component';

@Component({
  selector: 'app-housework',
  templateUrl: './housework.component.html',
  styleUrls: ['./housework.component.css']
})
export class HouseworkComponent implements OnInit {

  public houseworkList: HouseworkDto[] = new Array<HouseworkDto>();

  constructor(public dashboardService: DashboardService, public dialog: MatDialog) { }

  ngOnInit() {

  }

  // nie on init tylko dopiero po wybraniu mieszkania
  refreshFlatList(flatID: number){
    if (flatID != null) {
      this.dashboardService.getHouseWorkByFlatId(flatID, WorkTypeEnum.Clean).subscribe(response => {
        this.houseworkList = response;
      });
    }

  }


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
