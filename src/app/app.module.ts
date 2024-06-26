import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { GameComponent } from './components/game/game.component';
import { MapSelectorComponent } from './components/map-selector/map-selector.component';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import { ShopComponent } from './components/shop/shop.component';
import { Rocket1Component } from './components/rocket1/rocket1.component';
import { Rocket2Component } from './components/rocket2/rocket2.component';
import { Rocket3Component } from './components/rocket3/rocket3.component';
import { Rocket4Component } from './components/rocket4/rocket4.component';
import { JetPickComponent } from './components/jet-pick/jet-pick.component';
import { DefeatComponent } from './components/defeat/defeat.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    GameComponent,
    MapSelectorComponent,
    LeaderboardComponent,
    LoginComponent,
    RegisterComponent,
    ShopComponent,
    Rocket1Component,
    Rocket2Component,
    Rocket3Component,
    Rocket4Component,
    JetPickComponent,
    DefeatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
