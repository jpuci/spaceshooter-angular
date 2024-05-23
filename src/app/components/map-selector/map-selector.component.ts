import { Component, OnInit } from '@angular/core';
import { MapSelectorService } from './map-serv.service';

@Component({
  selector: 'app-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.scss']
})
export class MapSelectorComponent implements OnInit {
  maps: string[] = ['assets/map1.jpg', 'assets/map2.jpg', 'assets/map3.jpg'];
  lagCounter: number = 0;

  constructor(public MapSelectorServ: MapSelectorService) {}

  ngOnInit(): void {
    // Inicjalizujemy komponent
  }

  navigateLeft(): void {
    if (this.lagCounter === 1) {
      setTimeout(() => {
        this.changeMap(-1);
        this.lagCounter = 0; // Resetujemy licznik lagu
      }, 5000); // Opoznienie 0.5 sekundy
    } else {
      this.changeMap(-1);
      this.lagCounter++;
    }
  }

  navigateRight(): void {
    if (this.lagCounter === 1) {
      setTimeout(() => {
        this.changeMap(1);
        this.lagCounter = 0; // Resetujemy licznik lagu
      }, 5000); // Opoznienie 0.5 sekundy
    } else {
      this.changeMap(1);
      this.lagCounter++;
    }
  }

  // Metoda do zmiany mapy o jedną pozycję w lewo lub prawo
  private changeMap(direction: number): void {
    const currentMap = this.MapSelectorServ.getMap();
    this.MapSelectorServ.setMap((currentMap + direction + this.maps.length) % this.maps.length);
  }
}
