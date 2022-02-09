import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { AppRoutingModule } from './app-routing.module';
import { PokemonBattleComponent } from './pokemon-battle/pokemon-battle.component';
import { StarterPokemonComponent } from './starter-pokemon/starter-pokemon.component';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserHomepageComponent,
    PokemonBattleComponent,
    StarterPokemonComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
