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
  errorShow = false;
  dataLoaded = false;
  editActionOn = false; // if editaction is on
  constructor(
    public dashboardService: DashboardService,
    public dialogRef: MatDialogRef<AddHouseworkModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    debugger;
    if (this.data != null && this.data.flatId != null) { // selected flat
      this.houseworkDto.flatId = this.data.flatID;
    }
    else if (this.data != null && this.data.houseworkDto.id != null){ // edit flat
      this.houseworkDto = this.data.houseworkDto;
      this.editActionOn = true;
    }
    this.dataLoaded = true;
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  addHousework() {
    this.houseworkDto.username = JSON.parse(localStorage.getItem("login"));
    if (this.editActionOn) {
      this.editHousework();
    }
    if (!this.editActionOn){ // dont enter if edit in progress
      this.houseworkDto.flatId = this.data.flatId;
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



  editHousework() {
    debugger;
    if (this.editActionOn) {
      this.dashboardService.editHouseWork(this.houseworkDto).subscribe(
        response => {
          debugger;
          if (response) {
            this.closeModal();
          }
        },
        error => {
          this.errorShow = true;
        }
      )
    }
  }
}
