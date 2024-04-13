import { Component } from '@angular/core';
import { GameService } from 'src/app/components/GameService';

@Component({
  selector: 'app-rocket1',
  templateUrl: './rocket1.component.html',
  styleUrls: ['./rocket1.component.scss']
})
export class Rocket1Component {

  coins: number = 0;
  damageUpgradeClicked: boolean = false;
  upgradeInProgress: boolean = false;
  showPopup: boolean = false;

  constructor(private playerService: GameService) {
    this.coins = this.playerService.GetCoins();
  }

  ngOnInit(): void {
    this.getValues('damageProgress');
    this.getValues('agilityProgress');
  }

  increaseDamage(): void {
    this.playerService.increaseDamage(1, '1');
  }

  increaseSpeed(): void {
    this.playerService.increaseSpeed(1, '1');
  }

  increaseProgress(progressBar: HTMLElement, increaseAmount: number): void {
    let currentWidth = parseFloat(progressBar.style.width) || 0;
    currentWidth += increaseAmount;
    currentWidth = Math.min(currentWidth, 100);
    progressBar.style.width = currentWidth + '%';
  }

  increaseValues(id: string): void {
    if (!this.upgradeInProgress && this.playerService.coins >= 10) {
      const progressElement = document.getElementById(id);

      if (progressElement) {
        this.upgradeInProgress = true;

        // Opóźnienie 2 sekundowe
        setTimeout(() => {
          this.showPopup = true; // Pokaż popup po upływie 2 sekund
          setTimeout(() => {
            this.showPopup = false; // Ukryj popup po upływie kolejnych 6 sekund
            if (id == 'damageProgress') {
              this.increaseProgress(progressElement, 25);
              if(this.playerService.getDamage() <= 3) {
                this.playerService.coins -= 10;
                this.coins = this.playerService.GetCoins();
              }
              this.increaseDamage();
            }
            if (id == 'agilityProgress') {
              this.increaseProgress(progressElement, 25);
              if(this.playerService.getMovement() <= 3) {
                this.playerService.coins -= 10;
                this.coins = this.playerService.GetCoins();
              }
              this.increaseSpeed();
            }
            this.upgradeInProgress = false;
          }, 6000); // Kontynuacja po kolejnych 6 sekundach
        }, 2000); // Pokaż popup po 2 sekundach
      }
    }
  }

  getValues(id: string): void {
    const progressElement = document.getElementById(id);

    if (progressElement) {
      if (id == 'damageProgress') {
        let vl = this.playerService.getDamage() * 25;
        this.increaseProgress(progressElement, vl);
      }
      if (id == 'agilityProgress') {
        let vl = this.playerService.getMovement() * 25;
        this.increaseProgress(progressElement, vl);
      }
    }
  }
}
