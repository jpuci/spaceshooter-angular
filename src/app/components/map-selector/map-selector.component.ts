import {Component, OnInit} from '@angular/core';
import {MapSelectorService} from './map-serv.service';

@Component({
  selector: 'app-map-selector',
  templateUrl: './map-selector.component.html',
  styleUrls: ['./map-selector.component.scss']
})
export class MapSelectorComponent {
  maps: string[] = ['assets/map1.jpg', 'assets/map2.jpeg', 'assets/map3.jpg'];

  constructor(public MapSelectorServ: MapSelectorService) {
  }


  navigateLeft(): void {
    const current_map = this.MapSelectorServ.getMap()
    this.MapSelectorServ.setMap((current_map - 1 + this.maps.length) % this.maps.length);
  }

  navigateRight(): void {
    const current_map = this.MapSelectorServ.getMap()
    this.MapSelectorServ.setMap((current_map - 1 + this.maps.length) % this.maps.length);
  }
}
