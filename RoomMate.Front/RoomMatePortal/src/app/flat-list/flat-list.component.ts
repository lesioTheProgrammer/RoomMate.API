import { Component, OnInit, Input, SimpleChanges  } from '@angular/core';
import { AddressDto } from '../address/dto/address-dto';

@Component({
  selector: 'app-flat-list',
  templateUrl: './flat-list.component.html',
  styleUrls: ['./flat-list.component.css']
})
export class FlatListComponent implements OnInit {

  @Input() flatDetails: AddressDto;
  constructor() { }

  ngOnInit() {
  }
    ngOnChanges(flatDetails: SimpleChanges): void{
      debugger;
      let checkIfExist = this.flatDetails;
    }
}
