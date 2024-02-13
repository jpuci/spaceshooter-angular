import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
sampleLeaderboard = [{username:"User1", score: 120}, {username:"User1", score: 90}, {username: "User2", score: 30}]
  leaderBoard: any[] = [];
  ngOnInit() {
    if (localStorage.getItem('leaderboard') !== null){
      this.leaderBoard = JSON.parse(localStorage.getItem('leaderboard')!);
    } else {
      this.leaderBoard = this.sampleLeaderboard
    }
  }
}
