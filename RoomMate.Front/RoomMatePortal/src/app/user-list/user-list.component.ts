import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserManagementService } from '../user-controll-panel/user-management.service';
import { UserListDto } from '../user-controll-panel/dto/user-list-dto';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: Array<UserListDto>;
  @Input() refreshFlatId = new EventEmitter<Number>();

  constructor(public userManagementService: UserManagementService) { }

  ngOnInit() {
    this.refreshFlatId.subscribe(flatId =>{
      this.userManagementService.getUserByFlatId(flatId).subscribe(response=>{
        this.userList = response;
      });
    })

  }
}
