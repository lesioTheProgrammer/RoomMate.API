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
    public dashboardService: DashboardService,
    public dialogRef: MatDialogRef<AddHouseworkModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if(this.data != null && this.data.houseworkDto != null){
      this.houseworkDto = this.data.houseworkDto;
    }
    this.dataLoaded = true;
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  addHousework() {
    debugger;
    this.dashboardService.addHouseWork(this.houseworkDto).subscribe(
      response => {
        if (response) {
          this.closeModal();
        }
      },
      error => {
        this.errorShow = true;
      }
    );
  }
}
