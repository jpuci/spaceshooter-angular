import { Component } from '@angular/core';


@Component({
  selector: 'app-rocket1',
  templateUrl: './rocket1.component.html',
  styleUrls: ['./rocket1.component.scss']
})
export class Rocket1Component {

  increaseProgress(progressBar: HTMLElement, increaseAmount: number): void {
    let currentWidth = parseFloat(progressBar.style.width) || 0;
    currentWidth += increaseAmount;
    currentWidth = Math.min(currentWidth, 100);
    progressBar.style.width = currentWidth + '%';
  }

  increaseValues(id: string): void {
    const progressElement = document.getElementById(id);

    if (progressElement) {
      this.increaseProgress(progressElement, 10); // Zwiększamy wartość postępu o 10%
    }
  }

}
