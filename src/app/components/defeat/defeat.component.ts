import {Component, OnInit} from '@angular/core';
import { GameService } from 'src/app/components/GameService';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-defeat',
  templateUrl: './defeat.component.html',
  styleUrls: ['./defeat.component.scss']
})
export class DefeatComponent  {

points:string = "";
coins:number = 0;
score: number = 0;
  constructor( private playerService: GameService) {
    }

  ngOnInit(): void {
    this.coins = this.playerService.GetCoins();
    this.points = this.playerService.GetPoints();
    this.score = this.playerService.Getscore();

  }

}
