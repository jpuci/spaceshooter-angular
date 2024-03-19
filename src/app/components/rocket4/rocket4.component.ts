import { Component } from '@angular/core';
import { GameService } from 'src/app/components/GameService';

@Component({
  selector: 'app-rocket1',
  templateUrl: './rocket4.component.html',
  styleUrls: ['./rocket4.component.scss']
})
export class Rocket4Component {

  coins:number = 0;
  constructor(private playerService: GameService) {  this.coins = this.playerService.GetCoins();}

  ngOnInit(): void {
    this.getValues('damageProgress');
    this.getValues('agilityProgress');
  }
  increaseDamage(): void {

    this.playerService.increaseDamage(1,'4'); // Increase damage by 1
  }


  increaseSpeed(): void {

    this.playerService.increaseSpeed(1,'4'); // Increase damage by 1
  }

  increaseProgress(progressBar: HTMLElement, increaseAmount: number): void {
    let currentWidth = parseFloat(progressBar.style.width) || 0;
    currentWidth += increaseAmount;
    currentWidth = Math.min(currentWidth, 100);
    progressBar.style.width = currentWidth + '%';
  }

  increaseValues(id: string): void {



    if(this.playerService.coins>=10) {

      const progressElement = document.getElementById(id);

      if (progressElement) {
        this.increaseProgress(progressElement, 25); // Zwiększamy wartość postępu o 10%

        if (id == 'damageProgress') {
          if(this.playerService.getDamage()<=3) {
            this.playerService.coins -= 10;
            this.coins = this.playerService.GetCoins();
          }
          this.increaseDamage();
        }
        if (id == 'agilityProgress') {
          if(this.playerService.getMovement()<=3) {
            this.playerService.coins -= 10;
            this.coins = this.playerService.GetCoins();
          }
          this.increaseSpeed();
        }
      }



    }
  }
  getValues(id: string):void {
    const progressElement = document.getElementById(id);

    if (progressElement) {

      if (id == 'damageProgress') {
        let vl = this.playerService.getDamage()*25;
        this.increaseProgress(progressElement, vl);
      }

      if (id == 'agilityProgress') {
        let vl = this.playerService.getMovement()*25;
        this.increaseProgress(progressElement, vl);
      }


    }
  }
}
