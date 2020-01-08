import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard/dashboard.service';
import { HouseworkDto } from '../housework/dto/housework-dto';
import { WorkTypeEnum } from '../housework/dto/work-type-enum.enum';
import { AddHouseworkModalComponent } from '../housework/modal/add-housework-modal/add-housework-modal.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  public houseworkList : HouseworkDto[] = new Array<HouseworkDto>();

  constructor(public dashboardService : DashboardService, public dialog : MatDialog) { }

  ngOnInit() {
    this.dashboardService.getHouseWorkByFlatId(1, WorkTypeEnum.Shopping).subscribe(response => this.houseworkList = response);

  }

  editHouseWork(houseworkDto : HouseworkDto){
    debugger;
    const dialogRef = this.dialog.open(AddHouseworkModalComponent, {
      width: "450px",
      data:{houseworkDto : houseworkDto }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log("The dialog was closed");
    });
  }

}
