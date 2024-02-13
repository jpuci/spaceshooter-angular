import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DifficultyLevelComponent} from "./difficulty-level/difficulty-level.component";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {

  constructor(public dialog: MatDialog) {
  }
  openDifficulty(): void {
    let diffLevel = document.getElementById("diff-level");
    let rect = diffLevel!.getBoundingClientRect();
    // console.log(diffLevel!.top)
    this.dialog.open(DifficultyLevelComponent, {
      position: {
        top: rect.top + 'px',
        left: rect.left + rect.width + 'px'
      },
      width: '250px',
      // additional options as needed
    });
  }
}
