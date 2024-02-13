import {Component, OnInit} from '@angular/core';
import {LeaderboardEntry} from "../../model/LeaderboardEntry";

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements OnInit {
sampleLeaderboard :LeaderboardEntry[] = [{username:"User1", score: 120}, {username:"User1", score: 90}, {username: "User2", score: 30}]
  leaderBoard: LeaderboardEntry[] = [];
  ngOnInit() {
    if (localStorage.getItem('leaderboard') !== null){
      this.leaderBoard = JSON.parse(localStorage.getItem('leaderboard')!).sort((a: LeaderboardEntry, b : LeaderboardEntry) => b.score - a.score);
    } else {
      this.leaderBoard = this.sampleLeaderboard.sort((a: LeaderboardEntry, b : LeaderboardEntry) => b.score - a.score);
    }
  }
}
