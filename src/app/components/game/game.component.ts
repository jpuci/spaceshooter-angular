import {Component, OnInit, OnDestroy,  HostListener} from '@angular/core';
import {Rock} from "../../model/rock";
import {Bullet} from "../../model/bullet";
import { GameService } from 'src/app/components/GameService';
import {Coin} from "../../model/coin";
import { MapSelectorService } from '../map-selector/map-serv.service';
import { Router, NavigationEnd } from '@angular/router';
import {DefeatComponent} from "../defeat/defeat.component";


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})


export class GameComponent implements OnInit, OnDestroy {
  // @Input() left: number;
  // @Input() bottom: number;
  jet: any;
  board: any;
  start: boolean = false;
  damage: number = 0;
  movement: number = 0;
  num_bullets: number = 0;
  coin_number: number = 5;
  jetId: string = "";

  rocks: any[] = [];
  coins: any[] = [];
  rocksLeftTop: Rock[] = [];
  coinsLeftTop: Coin[] = [];
  bullets: Bullet[] = [];
  maps: string[] = ['assets/map1.jpg', 'assets/map2.jepg', 'assets/map3.jpg'];

  nextBullet = 0;
  nextRock = 0;
  nextCoin: number = 0;
  timer: number = 0;
  timerInterval: any;
  rockamount: number = 2000;
  coinamount: number = 2000;
  coinspeed: number = 1.5;
  rockspeed: number = 1.5;
  rockIntervalIds: any[] = [];
  coinIntervalIds: any[] = []; // Interval for generating coins
  bulletIntervalIds: any[] = [];
  playerLife: number = 3; // Initialize player life with 3
  bulletInterval: any; // Deklaruj identyfikator interwału

  selectedMapPath: number = this.mapService.getMap();


  constructor(private playerService: GameService,
              public mapService: MapSelectorService,
              private router: Router) {
    this.jetId = this.playerService.GetID();
    this.damage = this.playerService.getDamage();
    this.playerLife = this.playerService.getLife();
    this.movement = 25 * this.playerService.getMovement();
    this.num_bullets = this.playerService.getBullets();
    this.playerService.points = 0;


  }


  getFilterStyle(): string {
    switch (this.jetId) {
      case '1':
        return '';
      case '2':
        return 'hue-rotate(120deg)';
      case '3':
        return 'hue-rotate(220deg)';
      case '4':
        return 'hue-rotate(320deg)';
      default:
        return '';
    }
  }

  ngOnInit(): void {
    this.jet = document.getElementById("jet");
    this.board = document.getElementById("board");
    this.bulletInterval = setInterval(() => {
      this.shootBullet();
    }, 400);
    this.updateRockGenerationInterval();
    this.updateCoinGenerationInterval();


    this.selectedMapPath = this.mapService.getMap();
    this.startTimer();
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy called");
    this.stopTimer();
  }

  startTimer() {
    // Start the timer interval
    this.timerInterval = setInterval(() => {

      // Increase speed and decrease time between rock generation every 30 seconds
      if (this.timer == 30) {
        this.rockspeed += 0.5; // Increase rock speed by 0.5 units
        this.updateRockGenerationInterval();
      }

      if (this.timer == 60) {
        this.rockspeed -= 0.5;
        this.rockamount -= 500; // Increase rock speed by 0.5 units
        this.updateRockGenerationInterval();
      }

      if (this.timer == 80) {
        this.rockamount -= 500; // Increase rock speed by 0.5 units
        this.updateRockGenerationInterval();
      }

      if (this.timer == 100) {
        this.rockamount -= 200; // Increase rock speed by 0.5 units
        this.updateRockGenerationInterval();
      }


      // Increment the timer by 1 second
      this.timer++;

    }, 1000); // Update the timer every second

    // Start initial rock generation interval
    //this.startRockGenerationInterval();
  }


  startRockGenerationInterval() {
    // Start interval for generating rocks with updated rockamount
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


    }, this.rockamount);
    this.rockIntervalIds.push(generateRocks);


    let moveRocksInterval: any;
    let moveRocks = () => {

      if (this.rocksLeftTop.length !== 0) {
        for (let i = 0; i < this.rocksLeftTop.length; i++) {
          let rockTop = this.rocksLeftTop[i].top;
          let rockElement = document.getElementById("rock" + this.rocksLeftTop[i].index);

          if (rockTop >= document.getElementById("jet")!.offsetTop - 40 && rockElement) {
            //let jetBound = this.jet.getBoundingClientRect();
            //let rockBound = rockElement.getBoundingClientRect();

            this.rocksLeftTop.splice(i, 1);
            this.playerLife--;

            if (this.playerLife < 0) {
              // this.clearIntervals();
              if (this.timer >= this.playerService.Getscore()) {
                this.playerService.Bestscore(this.timer);
              }
              this.playerService.saveToLocalStorage();


              let username = localStorage.getItem('username');
              let leaderboard: any[] = JSON.parse(localStorage.getItem('leaderboard')!);
              if (leaderboard === null) {
                leaderboard = []
              }
              if (username !== null) {
                leaderboard.push({username: username, score: this.playerService.Getscore()})
              } else {
                leaderboard.push({username: 'Noname', score: this.playerService.Getscore()})
              }
              localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
              console.log(leaderboard);

              this.playerService.points = this.timer;
              // clearInterval(moveRocksInterval);
              this.start = false;
              this.playerService.refreshPage('/defeat');
              //this.router.navigateByUrl('/defeat');
              //  this.defeat.refreshPage();
              // window.location.reload();
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
          this.rocksLeftTop[i].top += this.rockspeed;
          clearInterval(moveRocksInterval);

        }

      }
      requestAnimationFrame(moveRocks);
    };

    moveRocksInterval = setInterval(moveRocks, this.rockamount);


  }



  startCoinGenerationInterval() {
    let generateCoins = setInterval(() => {
      this.board = document.getElementById("board");
      this.jet = document.getElementById("jet");
      let coin = document.createElement("div");

      coin.classList.add("coins");

      // Just getting the left of the coin to place it in a random position...
      // Generate a value between 0 and 450, where 450 is the board width minus the coin width
      coin.style.left = Math.floor(Math.random() * (document.getElementById("board")!.clientWidth - document.getElementById("board")!.clientHeight * 0.09)) + "px";

      coin.style.top = "0px";

      this.coinsLeftTop.push({ 'left': coin.style.left, 'top': 0, index: this.nextCoin });
      this.nextCoin += 1;

      // Append the coin to the board
      // this.board.appendChild(coin);


    }, this.coinamount);

    this.coinIntervalIds.push(generateCoins);

    let moveCoins = () => {
      if (this.coinsLeftTop.length !== 0) {
        for (let i = 0; i < this.coinsLeftTop.length; i++) {
          let coinTop = this.coinsLeftTop[i].top;
          let coinElement = document.getElementById("coin" + this.coinsLeftTop[i].index);


          if (coinElement ) {
            let jetBound = this.jet.getBoundingClientRect();
            let coinBound = coinElement.getBoundingClientRect();
            if (
              coinBound.left <= jetBound.right &&
              coinBound.right >= jetBound.left &&
              coinBound.top <= jetBound.bottom &&
              coinBound.bottom >= jetBound.top
            ) {
              this.collectCoin();
              this.coinsLeftTop.splice(i, 1);
            }
            if (coinTop >= document.getElementById("jet")!.offsetTop +20 && coinElement) {
              this.coinsLeftTop.splice(i, 1);
            }

          }

          // Stop the movement of coins that collide with the jet
          clearInterval(moveCoinsInterval);
          //  }

          // Apply the same speed to all coins
          this.coinsLeftTop[i].top += this.coinspeed;
          clearInterval(moveCoinsInterval);
        }
      }

      // Request next animation frame
      requestAnimationFrame(moveCoins);
    };

    let moveCoinsInterval = setInterval(moveCoins, this.coinamount);


  }



  clearRockGenerationInterval() {
    // Clear existing intervals for generating rocks
    this.rockIntervalIds.forEach(id => clearInterval(id));
    this.rockIntervalIds = [];
  }

  clearCoinGenerationInterval() {
    // Clear existing intervals for generating rocks
    this.coinIntervalIds.forEach(id => clearInterval(id));
    this.coinIntervalIds = [];
  }



  updateRockGenerationInterval() {
    // Update the interval for generating rocks
    this.clearRockGenerationInterval();
    this.startRockGenerationInterval();
  }

  updateCoinGenerationInterval() {
    // Update the interval for generating rocks
    this.clearCoinGenerationInterval();
    this.startCoinGenerationInterval();
  }



  stopTimer() {
    // Stop the timer interval
    clearInterval(this.timerInterval);
  }



  shootBullet() {
    this.jet = document.getElementById("jet");
    this.board = document.getElementById("board");
    let left = parseInt(window.getComputedStyle(this.jet).getPropertyValue("left"));


    let numberOfBullets = this.num_bullets; // Adjust the number of bullets as needed

    for (let i = 0; i < numberOfBullets; i++) {


      let bul = {
        bottom: 90, left: document.getElementById("jet")!.clientLeft
        , width: 20, height: 20, index: this.nextBullet
      };

      // Adjust the initial left position
      let index = this.nextBullet;
      this.nextBullet += 1;
      this.bullets.push(bul);


      let moveBullet = setInterval(() => {
        let rocks = document.getElementsByClassName("rocks");
        for (let rock of this.rocksLeftTop) {
          let i = this.rocksLeftTop.findIndex(d => d.index === rock.index);
          let rock2 = this.rocksLeftTop[i];
          if (rock2 != undefined) {
            let rockbound = document.getElementById("rock" + rock.index)!.getBoundingClientRect();
            let bulletbound = document.getElementById("bullet" + index)!.getBoundingClientRect();

            //Condition to check whether the rock/alien and the bullet are at the same position!
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
                this.bulletIntervalIds.forEach(id => clearInterval(id));
                this.bulletIntervalIds = [];
                this.playerService.Shipdestroyed();


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


        bul.left = left + 33; //bullet should always be placed at the top of my jet!
        bul.bottom = bulletbottom + 3;
        //double bullets

        if (i === 0) {
          bul.left -= 20; // Adjust the offset for the first bullet
        } else {
          bul.left += 1; // Adjust the offset for the second bullet
        }
      });


    }

  }

  collectCoin() {
    this.playerService.addCoin();
  }

  getCoins(): number {
    return this.playerService.coins;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.jet = document.getElementById("jet");
    this.board = document.getElementById("board");
    let left = parseInt(window.getComputedStyle(this.jet).getPropertyValue("left"));
    let speed = 20; // ship speed

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
    const duration = 125 - this.movement; // Adjust animation duration as needed
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

  protected readonly MapSelectorService = MapSelectorService;
}
