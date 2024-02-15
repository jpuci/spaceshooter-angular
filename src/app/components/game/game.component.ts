import {Component, OnInit, HostListener} from '@angular/core';
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
  jet: any;
  board: any;
  start: boolean = false;

  rocks: any[] = [];
  rocksLeftTop: Rock[] = [];
  bullets: Bullet[] = [];
  nextBullet = 0;
  nextRock = 0;
  rockIntervalIds: any[] = [];
  diffLevel = 1;
  isMobile = false;
  moveIntervalId: any;
  generateBulletIntervals: any[] = [];
  moveBulletIntervals: any[] = [];


  constructor() {
  }

  ngOnInit(): void {
    this.jet = document.getElementById("jet");
    this.board = document.getElementById("board");
    let diffLevel = localStorage.getItem('diffLevel');
    if (diffLevel == null) {
      localStorage.setItem('diffLevel', '1');
    } else {
      this.diffLevel = Number(diffLevel);
    }

      let ua = navigator.userAgent;

      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)){
        this.isMobile = true;
      }
  }


  vw(percent: number): number {
    let w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    return (percent * w) / 100;
  }

  moveLeft() {
    this.jet = document.getElementById("jet");
    let left = parseInt(window.getComputedStyle(this.jet).getPropertyValue("left"));
    if (left > (document.getElementById("board")!.clientLeft)) {
      this.jet.style.left = left - 2 + "px";
    }
  }

  moveRight() {
    this.jet = document.getElementById("jet");
    let left = parseInt(window.getComputedStyle(this.jet).getPropertyValue("left"));
    if (left <= (document.getElementById("board")!.clientLeft +
      document.getElementById("board")!.clientWidth - document.getElementById("jet")!.clientWidth)) {
      this.jet.style.left = left + 2 + "px";
    }
  }


  startAction(direction: string): void {
    this.stopAction(); // Ensure no intervals are running already
    this.moveIntervalId = window.setInterval(() => {
      // The function you want to execute repeatedly
      if (direction === 'left') {
        this.moveLeft()
      } else {
        this.moveRight()
      }
    }, 10); // Adjust the interval as needed
  }

  stopAction(): void {
    if (this.moveIntervalId !== undefined) {
      clearInterval(this.moveIntervalId);
      this.moveIntervalId = undefined;
    }
  }

  generateBullet() {
    this.jet = document.getElementById("jet");
    let bul = {
      bottom: 60, left: document.getElementById("jet")!.offsetLeft
      , width: 20, height: 20, index: this.nextBullet
    };
    let index = this.nextBullet;
    this.nextBullet += 1;
    this.bullets.push(bul);
    this.moveBullet(bul, index);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.jet = document.getElementById("jet");
    this.board = document.getElementById("board");
    let left = parseInt(window.getComputedStyle(this.jet).getPropertyValue("left"));

    if (event.key == "ArrowLeft" && left > (document.getElementById("board")!.clientLeft)) {
      this.jet.style.left = left - 10 + "px";
    } else if (event.key == "ArrowRight" && left <= (document.getElementById("board")!.clientLeft +
      document.getElementById("board")!.clientWidth - document.getElementById("jet")!.clientWidth)) {
      this.jet.style.left = left + 10 + "px";
    }
    if (event.key == "ArrowUp" || event.keyCode == 32) {
      this.generateBullet();

    }


  }


  onStart() {


    this.start = true;
    let generateRocks = setInterval(() => {
      this.board = document.getElementById("board");
      this.jet = document.getElementById("jet");
      let rock = document.createElement("div");
      rock.classList.add("rocks");
      rock.style.left = Math.floor(Math.random() * (document.getElementById("board")!.clientWidth - this.vw(10))) + "px";
      rock.style.top = "0px";
      this.rocksLeftTop.push({'left': rock.style.left, 'top': 0, index: this.nextRock})
      this.nextRock += 1;
      if (!this.start) {
        clearInterval(generateRocks);
      }
    }, Math.round(2000 * (1 / this.diffLevel)));

    this.rockIntervalIds.push(generateRocks)

    let moveRocks = setInterval(() => {
      if (this.rocksLeftTop.length !== 0) {

        for (let i = 0; i < this.rocksLeftTop.length; i++) {
          let rockTop =
            this.rocksLeftTop[i].top

          if (rockTop >= document.getElementById("jet")!.offsetTop - 40) {
            clearInterval(moveRocks);
            this.rockIntervalIds.forEach(id => clearInterval(id));
            this.generateBulletIntervals.forEach(id => clearInterval(id));
            this.moveBulletIntervals.forEach(id => clearInterval(id));
            this.rockIntervalIds = []
            this.start = false;
            let username = localStorage.getItem('username');
            let leaderboard: any[] = JSON.parse(localStorage.getItem('leaderboard')!);
            if (leaderboard === null) {
              leaderboard = []
            }
            if (username !== null) {
              leaderboard.push(
                {username: username, score: parseInt(document.getElementById("points")!.innerHTML)})
            } else {
              leaderboard.push({username: 'Noname', score: parseInt(document.getElementById("points")!.innerHTML)})
            }
            localStorage.setItem('leaderboard', JSON.stringify(leaderboard))
          }

          this.rocksLeftTop[i].top = rockTop + 25;
        }
      }
    }, Math.round(450 * (1 / this.diffLevel)));

    if (this.isMobile) {
      let generateBullet = setInterval(() => {
        this.generateBullet()
      }, 300);
      this.generateBulletIntervals.push(generateBullet);
    }

  }

  moveBullet(bul: any, index: number) {
    let moveBullet = setInterval(() => {
      // let left = parseInt(window.getComputedStyle(this.jet).getPropertyValue("left"))
      // let rocks = document.getElementsByClassName("rocks");
      for (let rock of this.rocksLeftTop) {
        let i = this.rocksLeftTop.findIndex(d => d.index === rock.index);
        let rock2 = this.rocksLeftTop[i];
        if (rock2 != undefined) {
          let rockbound = document.getElementById("rock" + rock.index)!.getBoundingClientRect();
          let bulletbound = document.getElementById("bullet" + index)!.getBoundingClientRect();

          //Condition to check whether the rock/alien and the bullet are at the same position..!
          //If so,then we have to destroy that rock

          if (
            bulletbound.left >= rockbound.left &&
            bulletbound.right <= rockbound.right &&
            bulletbound.top <= rockbound.top &&
            bulletbound.bottom <= rockbound.bottom
          ) {

            // this.rocks.splice(i, 1)
            this.rocksLeftTop.splice(i, 1)

            let idx = this.bullets.findIndex(d => d.index === index);
            this.bullets.splice(idx, 1);
            clearInterval(moveBullet);
            //Scoreboard
            document.getElementById("points")!.innerHTML =
              (parseInt(document.getElementById("points")!.innerHTML) + 1).toString();
          }
        }
      }
      let bulletbound = document.getElementById("bullet" + index)!.getBoundingClientRect();
      let bullettop = bulletbound.top;
      let bulletbottom = bul.bottom;

      //Stops the bullet from moving outside the gamebox
      if (bullettop <= document.getElementById("board")!.clientTop) {
        clearInterval(moveBullet);
        let idx = this.bullets.findIndex(d => d.index === index);
        this.bullets.splice(idx, 1);
      }

      if (!this.start) {
        clearInterval(moveBullet);
      }
      bul.bottom = bulletbottom + 3;
    });

    this.moveBulletIntervals.push(moveBullet);
  }


}


