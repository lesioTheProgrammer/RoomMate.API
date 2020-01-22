import { Component, OnInit, Input, SimpleChanges } from "@angular/core";
import { AddressDto } from "../address/dto/address-dto";

@Component({
  selector: "app-flat-list",
  templateUrl: "./flat-list.component.html",
  styleUrls: ["./flat-list.component.css"]
})
export class FlatListComponent implements OnInit {
  hasAddresCame: boolean = false;
  newAddressDetails: boolean = false;

  @Input() flatDetails: AddressDto;
  constructor() {}

  ngOnInit() {}

  ngOnChanges(flatDetails: SimpleChanges): void {
    debugger;
    this.hasAddresCame = false;
    this.newAddressDetails = false;
//     id 0 if new addres with street inpult angular
//     undefined if new addres from data entered in angular
//     defined and !=0 if from db
      if (this.flatDetails.id === 0 || this.flatDetails.cityId){
        this.newAddressDetails = true;
      } else if (this.flatDetails.id) {
        this.hasAddresCame = true;
      }
  }


  flatAdd(){
    debugger;
    let xd = this.flatDetails;
  }
}
