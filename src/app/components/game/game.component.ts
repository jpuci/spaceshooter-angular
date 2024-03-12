import {Component, OnInit, HostListener} from '@angular/core';
import {Rock} from "../../model/rock";
import {Bullet} from "../../model/bullet";
import { GameService } from 'src/app/components/GameService';// Adjust the path accordingly
import {Coins} from "../../model/coins";


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
  damage: number = 0;
  movement: number = 0;
  life: number = 0;

  rocks: any[] = [];
  rocksLeftTop: Rock[] = [];
  coinsLeftTop: Coins[] = [];
  bullets: Bullet[] = [];
  coins: Coins[] = []; // Array to store coins
  coinsCount:number = 0;
  nextBullet = 0;
  nextRock = 0;
  nextCoin: number = 0;
  rockIntervalIds: any[] = [];
  coinInterval: any; // Interval for generating coins
  playerLife: number = 3; // Initialize player life with 3


  constructor(private playerService: GameService) {
    this.damage = this.playerService.getDamage();
    this.life = this.playerService.getLife();
    this.movement = 30 + this.playerService.getMovement() * 10;
  }

  ngOnInit(): void {

    this.jet = document.getElementById("jet");
    this.board = document.getElementById("board");
    setInterval(() => {
      this.shootBullet();
    }, 500); // Adjust the interval as needed
  }


  shootBullet() {

    let numberOfBullets = 1; // Adjust the number of bullets as needed

    for (let i = 0; i < numberOfBullets; i++) {
      let left = parseInt(window.getComputedStyle(this.jet).getPropertyValue("left"));
      let bul = {
        bottom: 90, left: document.getElementById("jet")!.clientLeft
        , width: 20, height: 20, index: this.nextBullet
      };

      // Adjust the initial left position
      let index = this.nextBullet;
      this.nextBullet += 1;
      this.bullets.push(bul);


      let moveBullet = setInterval(() => {
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

              this.rocksLeftTop[i].life--;
              let idx = this.bullets.findIndex(d => d.index === index);
              this.bullets.splice(idx, 1);
              clearInterval(moveBullet);
              // Check if the life of the rock is greater than 0
              if (this.rocksLeftTop[i].life <= 0) {
                this.rocksLeftTop.splice(i, 1);


                document.getElementById("points")!.innerHTML =
                  (parseInt(document.getElementById("points")!.innerHTML) + 1).toString();
              }
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

        bul.left = left + 24; //bullet should always be placed at the top of my jet..!
        bul.bottom = bulletbottom + 3;

        //double bullets
        /* if (i === 0) {
           bul.left -= 10; // Adjust the offset for the first bullet
         } else {
           bul.left += 10; // Adjust the offset for the second bullet
         }*/
      }, 10);
    }
  }

  moveCoins() {
    // Move coins downwards
    for (let i = 0; i < this.coins.length; i++) {
      this.coins[i].top += 4; // Adjust the speed of the coins as needed
      const coinElement = document.getElementById("coin" + i);
      if (coinElement) {
        coinElement.style.top = this.coins[i].top + 'px';
      }

      // Check for collision with the jet
      const jetBound = this.jet.getBoundingClientRect();
    //  let coinBound = document.getElementById("coin" + i)!.getBoundingClientRect();

     const coinBound = coinElement?.getBoundingClientRect();

      if (coinBound && jetBound) {
        if (
          coinBound.left <= jetBound.right &&
          coinBound.right >= jetBound.left &&
          coinBound.top <= jetBound.bottom &&
          coinBound.bottom >= jetBound.top
        ) {
          // Collision detected, collect the coin
          this.collectCoin(i);
        }
      }
    }
  }

  collectCoin(index: number) {
    // Remove the collected coin from the array
    this.coins.splice(index, 1);
    this.playerService.coins +=1;
    this.coinsCount +=1;

    // Perform any other actions related to collecting coins
    // For example, update the player's score
    // You can also call any necessary service methods here
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.jet = document.getElementById("jet");
    this.board = document.getElementById("board");
    let left = parseInt(window.getComputedStyle(this.jet).getPropertyValue("left"));
    let speed = this.movement; // ship speed

    if (event.key == "ArrowLeft") {
      this.moveJetLeft(left, speed);
    } else if (event.key == "ArrowRight") {
      this.moveJetRight(left, speed);
    }
  }

  moveJetLeft(currentLeft: number, speed: number) {
    const targetLeft = Math.max(currentLeft - speed, 0); // Ensure jet stays within the board
    this.animateJetMovement(currentLeft, targetLeft);
  }

  moveJetRight(currentLeft: number, speed: number) {
    const boardWidth = this.board.clientWidth;
    const jetWidth = this.jet.clientWidth;
    const targetLeft = Math.min(currentLeft + speed, boardWidth - jetWidth); // Ensure jet stays within the board
    this.animateJetMovement(currentLeft, targetLeft);
  }

  animateJetMovement(startLeft: number, targetLeft: number) {
    const duration = 200; // Adjust animation duration as needed
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const percentage = Math.min(elapsedTime / duration, 1);

      const newLeft = startLeft + (targetLeft - startLeft) * percentage;
      this.jet.style.left = newLeft + 'px';

      if (percentage < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }




  onStart() {


    this.start = true;

    this.coinInterval = setInterval(() => {
      // Generate coins and add them to the array
      // Adjust the frequency and logic of coin generation as needed
      const newCoin = { top: 0, left: Math.random() * (this.board.clientWidth - 20) }; // Adjust the left position as needed
      this.coins.push(newCoin);
    }, 2000);


    setInterval(() => {
      this.moveCoins();
    }, 50);

    let generateRocks = setInterval(() => {
      this.board = document.getElementById("board");
      this.jet = document.getElementById("jet");
      let rock = document.createElement("div");

      rock.classList.add("rocks");

      // this.rocks.add(rock)
      //Just getting the left of the rock to place it in random position...
      //generate value between 0 to 450 where 450 => board width - rock width
      rock.style.left = Math.floor(Math.random() * (document.getElementById("board")!.clientWidth - document.getElementById("board")!.clientHeight * 0.09)) + "px";
      rock.style.top = "0px";


      // this.board.appendChild(rock);
      // this.rocks.push(rock);
      this.rocksLeftTop.push({'left': rock.style.left, 'top': 0, index: this.nextRock, life: 6 - this.damage})
      this.nextRock += 1;


      if (!this.start) {
        clearInterval(generateRocks);
      }
    }, 5000);



    this.rockIntervalIds.push(generateRocks)

    let moveRocks = () => {

      if (this.rocksLeftTop.length !== 0) {
        for (let i = 0; i < this.rocksLeftTop.length; i++) {
          let rockTop = this.rocksLeftTop[i].top;
          let rockElement = document.getElementById("rock" + this.rocksLeftTop[i].index);

          if (rockTop >= document.getElementById("jet")!.offsetTop - 40 && rockElement) {
            let jetBound = this.jet.getBoundingClientRect();
            let rockBound = rockElement.getBoundingClientRect();

            this.rocksLeftTop.splice(i, 1);
            this.playerLife--;

            if (this.playerLife < 0) {

              this.rockIntervalIds.forEach(id => clearInterval(id));
              this.rockIntervalIds = [];
              this.start = false;
              let username = localStorage.getItem('username');
              let leaderboard: any[] = JSON.parse(localStorage.getItem('leaderboard')!);
              if (leaderboard === null) {
                leaderboard = []
              }
              if (username !== null) {
                leaderboard.push({username: username, score: parseInt(document.getElementById("points")!.innerHTML)})
              } else {
                leaderboard.push({username: 'Noname', score: parseInt(document.getElementById("points")!.innerHTML)})
              }
              localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
              console.log(leaderboard);
            }

          }

          if (rockElement) {
            if (this.rocksLeftTop[i].life <= 1) {
              rockElement.classList.add('low-life_1');
            } else {
              rockElement.classList.remove('low-life');
            }
          }

          // Apply the same speed to all rocks
          this.rocksLeftTop[i].top += 0.5;
          clearInterval(moveRocksInterval);

        }

      }
      requestAnimationFrame(moveRocks);
    };

    let moveRocksInterval = setInterval(moveRocks, 5000); // Run the moveRocks function approximately every 1000 milliseconds
  }
}
