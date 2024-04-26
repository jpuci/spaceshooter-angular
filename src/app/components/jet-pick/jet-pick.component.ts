import { Component } from '@angular/core';
import { GameService } from 'src/app/components/GameService';
import {GameComponent} from "../game/game.component";


@Component({
  selector: 'app-jet-pick',
  templateUrl: './jet-pick.component.html',
  styleUrls: ['./jet-pick.component.scss']
})
export class JetPickComponent {
  constructor(private playerService: GameService) { }

  ngOnInit(): void {
    const buttonIds = ['2', '3', '4'];
    this.disableButtonsById(buttonIds);
    this.Check_if_Bought();

  }




  getID(id:string):void{
  this.playerService.selectedJet = id;

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
