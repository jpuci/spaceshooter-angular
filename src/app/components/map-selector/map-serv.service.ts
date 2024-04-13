import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MapSelectorService {
  public map: number = 0;

  getMap(): number {
    return this.map;
  }

  setMap(newMap: number): void {
    this.map = newMap;
  }
}
