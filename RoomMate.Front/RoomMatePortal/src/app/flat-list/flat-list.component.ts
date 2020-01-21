import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { AddressDto } from "../address/dto/address-dto";

@Component({
  selector: "app-flat-list",
  templateUrl: "./flat-list.component.html",
  styleUrls: ["./flat-list.component.css"]
})
export class FlatListComponent implements OnInit {
  hasAddresCame: boolean = false;
  @Input() flatDetails: AddressDto;
  constructor() {}

  ngOnInit() {}
  ngOnChanges(flatDetails: SimpleChanges): void {
    // checking if addres has came xD
    if ("houseNumber" in this.flatDetails) {
      this.hasAddresCame = true;
    }
  }
}
