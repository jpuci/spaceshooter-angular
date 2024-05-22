import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./components/main-page/main-page.component";
import {GameComponent} from "./components/game/game.component";
import {MapSelectorComponent} from "./components/map-selector/map-selector.component";
import {LeaderboardComponent} from "./components/leaderboard/leaderboard.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {ShopComponent} from "./components/shop/shop.component";
import {Rocket1Component} from "./components/rocket1/rocket1.component";
import {Rocket2Component} from "./components/rocket2/rocket2.component";
import {Rocket3Component} from "./components/rocket3/rocket3.component";
import {Rocket4Component} from "./components/rocket4/rocket4.component";
import {JetPickComponent} from "./components/jet-pick/jet-pick.component";
import {DefeatComponent} from "./components/defeat/defeat.component";
const routes: Routes = [
  {
  path: 'menu',
  component: MainPageComponent
  },
  {
    path: '',
    pathMatch: "full",
    redirectTo: '/menu'
  },
  {
    path: 'game',
    component: GameComponent
  },
  {
    path: 'maps',
    component: MapSelectorComponent
  },
  {
    path: 'leaderboard',
    component: LeaderboardComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'shop',
    component: ShopComponent
  },
  {
    path: 'rocket1',
    component: Rocket1Component
  },

  {
    path: 'rocket2',
    component: Rocket2Component
  },

  {
    path: 'rocket3',
    component: Rocket3Component
  },

  {
    path: 'rocket4',
    component: Rocket4Component
  },

  {
  path: 'jet-pick',
  component: JetPickComponent
},

  {
    path: 'defeat',
    component: DefeatComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
