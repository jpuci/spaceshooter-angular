import { Component, OnInit } from '@angular/core';
;
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})

export class ShopComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const buttonIds = ['2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];
    this.disableButtonsById(buttonIds);
  }

  disableButtonsById(buttonIds: string[]): void {
    buttonIds.forEach((id) => {
      const button = document.getElementById(id) as HTMLButtonElement | null;
      if (button) {
        button.disabled = true;
      }
    });
  }



}
