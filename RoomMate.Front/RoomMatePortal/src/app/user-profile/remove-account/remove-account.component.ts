import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-remove-account",
  templateUrl: "./remove-account.component.html",
  styleUrls: ["./remove-account.component.css"]
})
export class RemoveAccountComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<RemoveAccountComponent>) {}

  ngOnInit() {}

  closeModal(): void {
    this.dialogRef.close();
  }
}
