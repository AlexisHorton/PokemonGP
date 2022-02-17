import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PokemonBattleComponent } from './pokemon-battle/pokemon-battle.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserPokedexComponent } from './user-pokedex/user-pokedex.component';

const routes: Routes = [
  { path: 'userlogin', component: UserLoginComponent },
  { path: '', component: HomePageComponent},
  { path: 'home', component: HomePageComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'userhomepage', component: UserHomepageComponent },
  { path: 'pokemonbattle', component: PokemonBattleComponent},
  { path: 'pokedex', component: UserPokedexComponent},
  { path: '**', component: AppComponent  }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes), 
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }