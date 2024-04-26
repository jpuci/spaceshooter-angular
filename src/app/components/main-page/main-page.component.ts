import { Component } from '@angular/core';
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


}
