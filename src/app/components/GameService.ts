import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  damage_1: number = 1;
  damage_2: number = 1;
  damage_3: number = 1;
  damage_4: number = 1;
  damage:number = 1;
  life: number = 3;
  speed_1: number = 1;
  speed_2: number = 1;
  speed_3: number = 1;
  speed_4: number = 1;
  speed:number = 1;
  selectedJet: string = '1';
  coins: number =350;
  bullets:number = 1;
  points:string = '';

  jet_2:number = 0;
  jet_3:number = 0;
  jet_4:number = 0;

  constructor() {}

  GetCoins():number{
    return this.coins;
  }
  GetPoints():string{
    return this.points;
  }
  addCoin():void{
    this.coins +=1;
  }
  GetID():string{
    return this.selectedJet;
  }
  getDamage(): number {
    if(this.selectedJet=='1' ){
      this.damage = this.damage_1;
    }
    if(this.selectedJet=='2' ){
      this.damage = this.damage_2;
    }
    if(this.selectedJet=='3' ){
      this.damage = this.damage_3;
    }
    if(this.selectedJet=='4' ){
      this.damage = this.damage_4;
    }
    return this.damage;
  }
  getBullets(): number {
    if(this.selectedJet=='2' ||this.selectedJet=='4' ){
      this.bullets = 2;
    }
    if(this.selectedJet=='1' ||this.selectedJet=='3' ){
      this.bullets = 1;
    }
    return this.bullets;
  }
  getLife(): number {
    if(this.selectedJet=='3' || this.selectedJet=='4'){
      this.life = 6;
    }
    if(this.selectedJet=='1' || this.selectedJet=='2'){
      this.life = 3;
    }
    return this.life;
  }
  getMovement(): number {
    if(this.selectedJet=='1' ){
      this.speed = this.speed_1;
    }
    if(this.selectedJet=='2' ){
      this.speed = this.speed_2;
    }
    if(this.selectedJet=='3' ){
      this.speed = this.speed_3;
    }
    if(this.selectedJet=='4' ){
      this.speed = this.speed_4;
    }
    return this.speed;
  }
  increaseDamage(amount: number, id:string): void {

    let propertyName = 'damage_' + id;
    (this as any)[propertyName] += amount;
    if ((this as any)[propertyName] >= 4) {
      (this as any)[propertyName] = 4;
    }
  }


  increaseSpeed(amount: number, id:string): void {

    let propertyName = 'speed_' + id;
    (this as any)[propertyName] += amount;
    if ((this as any)[propertyName] >= 4) {
      (this as any)[propertyName] = 4;
    }
  }
}
