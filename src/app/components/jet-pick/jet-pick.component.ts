import { Component } from '@angular/core';
import { GameService } from 'src/app/components/GameService';
import { Router } from "@angular/router";
import {GameComponent} from "../game/game.component";


@Component({
  selector: 'app-jet-pick',
  templateUrl: './jet-pick.component.html',
  styleUrls: ['./jet-pick.component.scss']
})
export class JetPickComponent {
  showLoadingPopup = false;

  constructor(private playerService: GameService,
              private readonly router: Router) { }

  ngOnInit(): void {
    const buttonIds = ['2', '3', '4'];
    this.disableButtonsById(buttonIds);
    this.Check_if_Bought();

  }




  getID(id:string):void{
  this.playerService.selectedJet = id;

}

  getIDWithDelay(id: string): void {
    setTimeout(() => {
      this.showLoadingPopup = true;
      this.getID('1')

      setTimeout(() => {
        this.router.navigate(['/game']);
      }, 5000); // Po 5 sekundach przekierowanie do /game

    }, 3000); // Po 3 sekundach wyświetlenie popupu
  }
Check_if_Bought(){
    if(this.playerService.jet_2==1){
      this.enableButtonsById('2');
    }
  if(this.playerService.jet_3==1){
    this.enableButtonsById('3');
  }
  if(this.playerService.jet_4==1){
    this.enableButtonsById('4');
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
