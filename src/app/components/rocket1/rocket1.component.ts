import { Component } from '@angular/core';
import { GameService } from 'src/app/components/GameService';

@Component({
  selector: 'app-rocket1',
  templateUrl: './rocket1.component.html',
  styleUrls: ['./rocket1.component.scss']
})
export class Rocket1Component {
  constructor(private playerService: GameService) { }

  ngOnInit(): void {
    this.getValues('damageProgress');
    this.getValues('agilityProgress');
  }
  increaseDamage(): void {

    this.playerService.increaseDamage(1); // Increase damage by 1
  }


  increaseSpeed(): void {

    this.playerService.increaseSpeed(20); // Increase damage by 1
  }

  increaseProgress(progressBar: HTMLElement, increaseAmount: number): void {
    let currentWidth = parseFloat(progressBar.style.width) || 0;
    currentWidth += increaseAmount;
    currentWidth = Math.min(currentWidth, 100);
    progressBar.style.width = currentWidth + '%';
  }

  increaseValues(id: string): void {
    const progressElement = document.getElementById(id);

    if (progressElement) {
      this.increaseProgress(progressElement, 25); // Zwiększamy wartość postępu o 10%

      if(id=='damageProgress'){
        this.increaseDamage();
    }
      if(id=='agilityProgress'){
        this.increaseSpeed();
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
