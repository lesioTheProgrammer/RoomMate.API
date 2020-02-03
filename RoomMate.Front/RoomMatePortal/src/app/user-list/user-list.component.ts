import { Component, OnInit, Input } from '@angular/core';
import { UserManagementService } from '../user-controll-panel/user-management.service';
import { UserListDto } from '../user-controll-panel/dto/user-list-dto';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  userList: Array<UserListDto>;


  constructor(public userManagementService: UserManagementService) { }

  ngOnInit() {
    // this.userManagementService.getUserByFlatId(this.flatId).subscribe(response=>{
    //   this.userList = response;
    // });

  }

  getUserList(flatid: number) {
    this.userManagementService.getUserByFlatId(flatid).subscribe(response=>{
      this.userList = response;
    });
  }







}
