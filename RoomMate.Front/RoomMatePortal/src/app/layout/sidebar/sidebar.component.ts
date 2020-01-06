import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PassBetweenComponService } from 'src/app/PassBetweenComponService';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private data: PassBetweenComponService) { }

  ngOnInit() {
  }



  logout(){
    localStorage.removeItem("jwt");
    this.data.sendLoginState(false);
  }

}
