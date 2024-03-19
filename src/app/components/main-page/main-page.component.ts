import { Component } from '@angular/core';
import {SettingsComponent} from "../settings/settings.component";
import {MatDialog} from "@angular/material/dialog";
import {GameService} from "../GameService";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  coins:number = 0;
  username = localStorage.getItem('username')

  constructor(public dialog: MatDialog,private playerService: GameService) {
    this.coins = this.playerService.GetCoins();
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


}
