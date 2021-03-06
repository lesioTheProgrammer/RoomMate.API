import { HouseworkDto } from "./../../dto/housework-dto";
import { DashboardService } from "./../../../dashboard/dashboard.service";
import {
  Component,
  OnInit,
  Inject,
  Input,
  ViewChild,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { WorkTypeEnum } from "../../dto/work-type-enum.enum";

@Component({
  selector: "app-add-housework-modal",
  templateUrl: "./add-housework-modal.component.html",
  styleUrls: ["./add-housework-modal.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddHouseworkModalComponent implements OnInit {
  @Input("houseworkDto") houseworkDto: HouseworkDto = new HouseworkDto();

  // event emiter for dashboard
  @Output() saved = new EventEmitter<boolean>();

  errorShow = false;
  dataLoaded = false;
  editActionOn = false; // if editaction is on
  disableButton = true;
  constructor(
    public dashboardService: DashboardService,
    public dialogRef: MatDialogRef<AddHouseworkModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    if (this.data != null && this.data.flatId != null) {
      // selected flat
      this.houseworkDto.flatId = this.data.flatID;
    } else if (this.data != null && this.data.houseworkDto.id != null) {
      // edit flat
      this.houseworkDto = this.data.houseworkDto;
      this.editActionOn = true;
    }
    this.dataLoaded = true;
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  onSelectedOption(): void {
    if (this.houseworkDto.workType == 2) {
      this.disableButton = true;
    }
  }

  checkFormErrors(isValidDescription: boolean, isPriceValid: boolean) {
    if (
      (isValidDescription && this.houseworkDto.workType == 1) ||
      (isValidDescription && isPriceValid)
    ) {
      this.disableButton = false;
    } else if (
      isValidDescription &&
      isPriceValid == null &&
      this.houseworkDto.workType == 2
    ) {
      // edit shopping component
      this.disableButton = false;
    } else {
      this.disableButton = true;
    }
  }

  addHousework() {
    this.houseworkDto.username = JSON.parse(localStorage.getItem("login"));
    if (this.editActionOn) {
      this.editHousework();
    }
    if (!this.editActionOn) {
      // dont enter if edit in progress
      this.houseworkDto.flatId = this.data.flatId;
      this.dashboardService.addHouseWork(this.houseworkDto).subscribe(
        (response) => {
          if (response) {
            if (!this.houseworkDto.prices) {
              // if theres no price
              this.saved.emit(true);
              this.closeModal();
            } else {
              this.saved.emit(false);
              this.closeModal();
            }
          }
        },
        (error) => {
          this.errorShow = true;
        }
      );
    }
  }

  editHousework() {
    if (this.editActionOn) {
      this.dashboardService.editHouseWork(this.houseworkDto).subscribe(
        (response) => {
          if (response) {
            this.closeModal();
            this.houseworkDto.modificatedDate = response.modificatedDate;
          }
        },
        (error) => {
          this.errorShow = true;
        }
      );
    }
  }
}
