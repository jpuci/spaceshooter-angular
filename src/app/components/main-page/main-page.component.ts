import {AfterViewInit, Component } from '@angular/core';
import {SettingsComponent} from "../settings/settings.component";
import {MatDialog} from "@angular/material/dialog";
declare var webgazer: any;

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  username = localStorage.getItem('username')

  constructor(public dialog: MatDialog) {
  }
  openSettings(): void {
    this.dialog.open(SettingsComponent, {
      position: {
        top: '20px',
        left: '20px'
      },
      width: '250px',
      // additional options as needed
    });
  }

  // ngAfterViewInit(): void {
  //   webgazer.begin().then(function() {
  //     console.log("WebGazer has initialized.");
  //   }).catch(function(error:any) {
  //     console.error("Initialization error:", error);
  //   });
  //   // console.log(webgazer)
  //   webgazer.setGazeListener((data:any, elapsedTime:any) => {
  //     if (data == null) {
  //       console.log('sad :(')
  //       return;
  //     }
  //     console.log(data.x, data.y);
  //   }).begin();
  // }

}
