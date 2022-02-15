import { Component, EventEmitter, Output } from '@angular/core';
import { UserLoginComponent } from './user-login/user-login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { UserAPIService } from './user-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PokemonAngular';
  currentUserID: number = 0;

  constructor(private userapi: UserAPIService, private router: Router) {
  this.currentUserID = this.userapi.currentUserID;
}

LogOut(){
  window.sessionStorage.clear();
  this.userapi.currentUser = '';
  this.userapi.currentUserID = 0;
  this.router.navigate(["/home"])
}

}

