import { DashboardService } from './dashboard/dashboard.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule, MatDialogModule, MatDialogRef } from '@angular/material';
import { CommonModule } from '@angular/common';
import { AppMaterialModules } from './material-module/material.module';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { TopbarComponent } from './layout/topbar/topbar.component';
import { MyRoomComponent } from './my-room/my-room.component';
import { Routes, RouterModule, Router } from '@angular/router';
import { ShoppingComponent } from './shopping/shopping.component';
import { HouseworkComponent } from './housework/housework.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddHouseworkModalComponent } from './housework/modal/add-housework-modal/add-housework-modal.component';
import { UserControllPanelComponent } from './user-controll-panel/user-controll-panel.component';
import { LoginComponent } from './user-controll-panel/login/login.component';
import { RegisterComponent } from './user-controll-panel/register/register.component';
import { PassBetweenComponService } from './PassBetweenComponService';
import {CookieService} from 'ngx-cookie-service';

const routes: Routes =  [
  { path: '', component: MyRoomComponent},
  { path: 'myRoom', component: MyRoomComponent},
  { path: 'dashboard', component: DashboardComponent}

];
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopbarComponent,
    MyRoomComponent,
    ShoppingComponent,
    HouseworkComponent,
    DashboardComponent,
    AddHouseworkModalComponent,
    UserControllPanelComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash: true}),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    MatDialogModule,
    AppMaterialModules,
  ],
  entryComponents: [AddHouseworkModalComponent, LoginComponent, RegisterComponent],
  providers: [[DashboardService], [
    {
      provide: MatDialogRef,
      useValue: {}
    }
 ],
 [PassBetweenComponService], [CookieService]
],
  bootstrap: [AppComponent]
})
export class AppModule { }
platformBrowserDynamic().bootstrapModule(AppModule);
