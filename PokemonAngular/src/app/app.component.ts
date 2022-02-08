import { Component, EventEmitter, Output } from '@angular/core';
import { UserLogin } from './user-login';
import { UserLoginComponent } from './user-login/user-login.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PokemonAngular';

  addUser(user: UserLogin) {
    alert("User added!")
  }
}
