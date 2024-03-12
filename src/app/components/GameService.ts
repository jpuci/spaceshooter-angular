import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  damage: number = 1;
  life: number = 3;
  speed: number = 1;
  selectedJet: string = '';
  coins: number = 0;

  constructor() { }
  getDamage(): number {
    return this.damage;
  }

  getLife(): number {
    return this.life;
  }
  getMovement(): number {
    return this.speed;
  }
  increaseDamage(amount: number): void {
    this.damage += amount;
    if(this.damage >= 4)
    {
      this.damage = 4;
    }
  }


  increaseSpeed(amount: number): void {
    this.speed += amount;
    if(this.speed >= 4)
    {
      this.speed = 4;
    }
  }

}
