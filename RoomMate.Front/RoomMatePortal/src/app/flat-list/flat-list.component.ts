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
    debugger;
    // checking if addres has came xD
    // wrong becaue now i am creating new obj
    // have to check if theres value in non inputeded
    // property of addres dto
    if ("flatName" in this.flatDetails) {
      this.hasAddresCame = true;
    }
  }
}
