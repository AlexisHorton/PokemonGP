import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserAPIService } from '../user-api.service';
import { UserLogin } from '../user-login';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  showCreateButton: boolean = false;

  newUser: UserLogin = {
    id: 0,
    username: '',
    password: ''
  }

  loginUser: string = '';
  loginPassword: string = '';

  @Output() AddUser: EventEmitter<UserLogin> = new EventEmitter<UserLogin>();

  constructor(private api: UserAPIService) { }

  ngOnInit(): void {
  }

  addUser(){
    alert("User added!")
    this.AddUser.emit(this.newUser)
    this.newUser.username = '';
    this.newUser.password = '';
  }

  signIn(){
    this.api.GetAUser(this.loginUser, this.loginPassword, 
      (result: any) => {
        if (result) {
          alert(`Welcome! ${this.loginUser}`);
        }
        else {
          alert('Sorry, that did not match');
        }
    })
  }

}
