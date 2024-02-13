import {Component, OnInit, Input, ElementRef, Renderer2, HostListener} from '@angular/core';
import {Rock} from "../../model/rock";
import {Bullet} from "../../model/bullet";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
// export class GameComponent {
//
// }
//
// // bullet.component.ts
// import { Component, OnInit, Input, ElementRef, Renderer2 } from '@angular/core';
//
// @Component({
//   selector: 'app-bullet',
//   template: `<div class="bullets" [style.left.px]="left" [style.bottom.px]="bottom"></div>`,
//   styles: []
// })


export class GameComponent implements OnInit {
  // @Input() left: number;
  // @Input() bottom: number;
  jet : any;
  board : any;
  start: boolean = false;

  rocks: any[] = [];
  rocksLeftTop: Rock[] = [];
  bullets: Bullet[] = [];


  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.jet = document.getElementById("jet");
    this.board = document.getElementById("board");

  }


  vh(percent: number ) :number {
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    return (percent * h) / 100;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.jet = document.getElementById("jet");
    this.board = document.getElementById("board");
    let left = parseInt(window.getComputedStyle(this.jet).getPropertyValue("left"));
    if (event.key == "ArrowLeft" && left > (document.getElementById("board")!.clientLeft)) {
      this.jet.style.left = left - 10 + "px";
    }  else if (event.key == "ArrowRight" && left <= (document.getElementById("board")!.clientLeft +
      document.getElementById("board")!.clientWidth - document.getElementById("jet")!.clientWidth)) {
    this.jet.style.left = left + 10 + "px";
      console.log(this.jet.getBoundingClientRect())
  }


    if (event.key == "ArrowUp" || event.keyCode == 32) {

    this.jet = document.getElementById("jet");
    let bul = {bottom: 60, left: document.getElementById("jet")!.clientLeft
      , width: 20, height: 20};
    let index = this.bullets.length;
    this.bullets.push(bul);



    let moveBullet = setInterval(() => {
      // let rocks = document.getElementsByClassName("rocks");
      for (let i = 0; i < this.rocksLeftTop.length; i++) {
        let rock = this.rocks[i];
        if (rock != undefined) {
          let rockbound = document.getElementById("rock" + i)!.getBoundingClientRect();
          let bulletbound = document.getElementById("bullet" + index)!.getBoundingClientRect();
          //Condition to check whether the rock/alien and the bullet are at the same position..!
          //If so,then we have to destroy that rock

          if (
            bulletbound.left >= rockbound.left &&
            bulletbound.right <= rockbound.right &&
            bulletbound.top <= rockbound.top &&
            bulletbound.bottom <= rockbound.bottom
          ) {
            //@ts-ignore
            // rock.parentElement.removeChild(rock); //Just removing that particular rock;
            this.rocks.splice(i, 1)
            this.rocksLeftTop.splice(i, 1)
            //@ts-ignore
            // bullet.parentElement.removeChild(bullet);
            // const indexOfObject = this.bullets.findIndex((object) => {
            //   return object.bottom === bul.bottom;
            // });
            this.bullets.splice(index, 1)
            //Scoreboard
            document.getElementById("points")!.innerHTML =
              (parseInt(document.getElementById("points")!.innerHTML) + 1).toString();
          }
        }
      }
      let bulletbottom = bul.bottom;

      //Stops the bullet from moving outside the gamebox
      if (bulletbottom <= document.getElementById("board")!.clientTop) {
        clearInterval(moveBullet);
      }

      bul.left = left; //bullet should always be placed at the top of my jet..!
      bul.bottom = bulletbottom + 3;
      console.log(bul);
    });
  }
  }

  onStart(){


    this.start = true;
    let generateRocks = setInterval(() => {
      this.board = document.getElementById("board");
      this.jet = document.getElementById("jet");
      let rock = document.createElement("div");
      rock.classList.add("rocks");
      // this.rocks.add(rock)
      //Just getting the left of the rock to place it in random position...
      let rockLeft = parseInt(
        window.getComputedStyle(rock).getPropertyValue("left")
      );
      //generate value between 0 to 450 where 450 => board width - rock width
      rock.style.left = Math.floor(Math.random() * (document.getElementById("board")!.clientWidth - document.documentElement.clientHeight*0.09)) + "px";
      rock.style.top = "0px";

      // this.board.appendChild(rock);
      this.rocks.push(rock);
      this.rocksLeftTop.push({'left': rock.style.left, 'top': 0})
    }, 2000);

    let moveRocks = setInterval(() => {
      // let rocks = document.querySelectorAll<HTMLElement>(".rocks");
      if (this.rocks.length !== 0) {

        for (let i = 0; i < this.rocks.length; i++) {
          let rock : HTMLElement = this.rocks[i];

          let rockTop =
            this.rocksLeftTop[i].top

          if (rockTop >= 475) {
            clearInterval(moveRocks);
            this.start=false;
          }

          this.rocksLeftTop[i].top =   rockTop + 25;
          // rock.style.top =
          this.rocks[i] = rock;
        }
      }
    }, 450);
  }
}


