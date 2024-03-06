import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.scss']
})
export class MapSelectorComponent implements OnInit {
  maps: string[] = ['assets/map1.jpg', 'assets/map2.jpg', 'assets/map3.jpg'];
  selectedMapIndex: number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  selectMap(index: number): void {
    this.selectedMapIndex = index;
  }

  navigateLeft(): void {
    this.selectedMapIndex = (this.selectedMapIndex - 1 + this.maps.length) % this.maps.length;
  }

  navigateRight(): void {
    this.selectedMapIndex = (this.selectedMapIndex + 1) % this.maps.length;
  }
}
