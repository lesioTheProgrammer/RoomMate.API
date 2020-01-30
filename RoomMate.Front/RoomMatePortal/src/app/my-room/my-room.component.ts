import { Component, OnInit } from '@angular/core';
import { AddressFlatDto } from '../address/dto/address-dto';
import { FlatAddressService } from '../address/flat-address.service';

@Component({
  selector: 'app-my-room',
  templateUrl: './my-room.component.html',
  styleUrls: ['./my-room.component.css']
})
export class MyRoomComponent implements OnInit {

  constructor(
   public flatAddressService: FlatAddressService
  ) { }

  flatList: AddressFlatDto[];
  userName: string;

  ngOnInit() {
    this.userName = JSON.parse(localStorage.getItem("login"));
    // get all flats by userID on init (userflats)
    this.flatAddressService.getAllFlats(this.userName).subscribe( response => {
      debugger;
      if (response.length > 0 && response[0].id !== 0) {
        this.flatList = response;
      }
    });
  }

}
