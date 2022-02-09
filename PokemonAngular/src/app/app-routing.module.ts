import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PokemonBattleComponent } from './pokemon-battle/pokemon-battle.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';

const routes: Routes = [
  { path: 'userlogin', component: UserHomepageComponent},
  { path: 'battle', component: PokemonBattleComponent}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
