import { HouseworkDto } from './../../dto/housework-dto';
import { DashboardService } from './../../../dashboard/dashboard.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-add-housework-modal',
  templateUrl: './add-housework-modal.component.html',
  styleUrls: ['./add-housework-modal.component.css']
})
export class AddHouseworkModalComponent implements OnInit {
  @Input('houseworkDto') houseworkDto: HouseworkDto = new HouseworkDto();
  errorShow: boolean = false;
  dataLoaded: boolean = false;
  constructor(
    //serwisy co to jest lol
    public dashboardService: DashboardService,
    public dialogRef: MatDialogRef<AddHouseworkModalComponent>,
    //co to robi zeby dialog wyswietlic
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
   //po co dto
    if(this.data.houseworkDto != null){
      this.houseworkDto = this.data.houseworkDto;
    }
    this.dataLoaded = true;
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  addHousework() {
    this.dashboardService.addHouseWork(this.houseworkDto).subscribe(
      response => {
        if (response) {
          debugger;
          this.closeModal();
        }
      },
      error => {
        this.errorShow = true;
      }
    );
  }
}
