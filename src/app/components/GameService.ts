import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class GameService {
  damage_1: number = 1;
  damage_2: number = 1;
  damage_3: number = 1;
  damage_4: number = 1;
  damage: number = 1;
  life: number = 3;
  speed_1: number = 1;
  speed_2: number = 1;
  speed_3: number = 1;
  speed_4: number = 1;
  speed: number = 1;
  selectedJet: string = '1';
  coins: number = 350;
  bullets: number = 1;
  points: string = '';

  jet_2: number = 0;
  jet_3: number = 0;
  jet_4: number = 0;

  constructor() {
    this.loadFromLocalStorage();
  }

  GetCoins(): number {
    return this.coins;
  }

  GetPoints(): string {
    return this.points;
  }

  addCoin(): void {
    this.coins += 1;
  }

  GetID(): string {
    return this.selectedJet;
  }

  getDamage(): number {
    if (this.selectedJet == '1') {
      this.damage = this.damage_1;
    }
    if (this.selectedJet == '2') {
      this.damage = this.damage_2;
    }
    if (this.selectedJet == '3') {
      this.damage = this.damage_3;
    }
    if (this.selectedJet == '4') {
      this.damage = this.damage_4;
    }
    return this.damage;
  }

  getBullets(): number {
    if (this.selectedJet == '2' || this.selectedJet == '4') {
      this.bullets = 2;
    }
    if (this.selectedJet == '1' || this.selectedJet == '3') {
      this.bullets = 1;
    }
    return this.bullets;
  }

  getLife(): number {
    if (this.selectedJet == '3' || this.selectedJet == '4') {
      this.life = 6;
    }
    if (this.selectedJet == '1' || this.selectedJet == '2') {
      this.life = 3;
    }
    return this.life;
  }

  getMovement(): number {
    if (this.selectedJet == '1') {
      this.speed = this.speed_1;
    }
    if (this.selectedJet == '2') {
      this.speed = this.speed_2;
    }
    if (this.selectedJet == '3') {
      this.speed = this.speed_3;
    }
    if (this.selectedJet == '4') {
      this.speed = this.speed_4;
    }
    return this.speed;
  }

  increaseDamage(amount: number, id: string): void {

    let propertyName = 'damage_' + id;
    (this as any)[propertyName] += amount;
    if ((this as any)[propertyName] >= 4) {
      (this as any)[propertyName] = 4;
    }
    this.saveToLocalStorage();
  }


  increaseSpeed(amount: number, id: string): void {

    let propertyName = 'speed_' + id;
    (this as any)[propertyName] += amount;
    if ((this as any)[propertyName] >= 4) {
      (this as any)[propertyName] = 4;
    }
    this.saveToLocalStorage();
  }

  // Method to convert service data into a JSON object
  toJSON(): any {
    return {
      damage_1: this.damage_1,
      damage_2: this.damage_2,
      damage_3: this.damage_3,
      damage_4: this.damage_4,
      damage: this.damage,
      life: this.life,
      speed_1: this.speed_1,
      speed_2: this.speed_2,
      speed_3: this.speed_3,
      speed_4: this.speed_4,
      speed: this.speed,
      selectedJet: this.selectedJet,
      coins: this.coins,
      bullets: this.bullets,
      points: this.points,
      jet_2: this.jet_2,
      jet_3: this.jet_3,
      jet_4: this.jet_4
    };
  }

  // Method to save data to localStorage
  saveToLocalStorage(): void {
    const jsonData = JSON.stringify(this.toJSON());
    localStorage.setItem('gameData', jsonData);
  }

  // Method to load data from localStorage
  loadFromLocalStorage(): void {
    const savedData = localStorage.getItem('gameData');
    if (savedData) {
      const data = JSON.parse(savedData);
      // Update service properties with loaded data
      Object.assign(this, data);
    }
  }

  // Method to clear data from localStorage
  clearLocalStorage(): void {
    localStorage.removeItem('gameData');
  }

}
