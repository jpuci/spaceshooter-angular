import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/components/GameService';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})

export class ShopComponent {
  coins:number = 0;
  buttonIds1: string []= [];

  constructor(private playerService: GameService) {
    this.coins = this.playerService.GetCoins();
  }

  ngOnInit(): void {

    const buttonIds = ['2', '3', '4'];
    this.disableButtonsById(buttonIds);


    if(this.coins < 100){
       this.buttonIds1 = ['buy-1', 'buy-2', 'buy-3'];
    }

    if(this.coins >= 100 && this.coins < 200 ){
       this.buttonIds1 = ['buy-2', 'buy-3'];

    }

    if(this.coins >= 200 && this.coins < 300){
       this.buttonIds1 = ['buy-3'];
    }

    if(this.coins >= 300){
      this.buttonIds1 = [];
    }
    this.disableButtonsById(this.buttonIds1);



    if(this.playerService.jet_2==1){
      this.buttonIds1 = ['buy-1'];
      this.enableButtonsById('2');
      this.disableButtonsById(this.buttonIds1);
    }

    if(this.playerService.jet_3==1){
      this.buttonIds1 = ['buy-2'];
      this.enableButtonsById('3');
      this.disableButtonsById(this.buttonIds1);
    }

    if(this.playerService.jet_4==1){
      this.buttonIds1 = ['buy-3'];
      this.enableButtonsById('4');
      this.disableButtonsById(this.buttonIds1);
    }

  }
  getID(id:string):void{
    this.playerService.selectedJet = id;

  }

  buyRocket(id:string) :void
{
  if(id=='2'&& this.playerService.jet_2==0 && this.coins >= 100)
  {
    this.coins -= 100;
    this.playerService.coins -=100;
    this.enableButtonsById('2');
    this.buttonIds1 = ['buy-1'];
    this.disableButtonsById(this.buttonIds1);
    this.playerService.jet_2=1;
    this.ngOnInit();
  }

  if(id=='3'&&this.playerService.jet_3==0 && this.coins >= 200)
{
  this.coins -= 200;
  this.playerService.coins -=200;
  this.enableButtonsById('3');
  this.buttonIds1 = ['buy-2'];
  this.disableButtonsById(this.buttonIds1);
  this.playerService.jet_3=1;
  this.ngOnInit();
}

  if(id=='4'&&this.playerService.jet_4==0 && this.coins>=300)
  {
    this.coins -= 300;
    this.playerService.coins -=300;
    this.enableButtonsById('4');
    this.buttonIds1 = ['buy-3'];
    this.disableButtonsById(this.buttonIds1);
    this.playerService.jet_4=1;
    this.ngOnInit();
  }
}

  enableButtonsById(id:string) {

      const button = document.getElementById(id);
      if (button) {
        button.removeAttribute('disabled'); // Usunięcie atrybutu disabled
        button.style.backgroundColor = 'transparent';
      }
  }

  disableButtonsById(buttonIds: string[]): void {
    buttonIds.forEach((id) => {
      const button = document.getElementById(id) as HTMLButtonElement | null;
      if (button) {
        button.disabled = true;
        button.style.backgroundColor = 'grey';
      }
    });
  }



}
