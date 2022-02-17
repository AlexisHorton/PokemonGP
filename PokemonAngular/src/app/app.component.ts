import { Component, EventEmitter, Output } from '@angular/core';
import { UserLogin } from './user-login';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserAPIService } from './user-api.service';
import { Router } from '@angular/router';
import { PokemonAPIService } from './pokemon-api.service';

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

  addUser(user: UserLogin) {
    alert("User added!")
  }

  LogOut(){
    window.sessionStorage.clear();
    this.userapi.currentUser = '';
    this.userapi.currentUserID = 0;
    this.userapi.teamcount = 0;
    this.router.navigate(["/home"])
  }
}