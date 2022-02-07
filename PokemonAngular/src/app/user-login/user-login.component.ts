import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { UserLogin } from '../user-login';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {


  newUser: UserLogin = {
    id: 0,
    username: '',
    password: ''
  }

  @Output() AddUser: EventEmitter<UserLogin> = new EventEmitter<UserLogin>();

  constructor() { }

  ngOnInit(): void {
  }

  addUser(){
    this.AddUser.emit(this.newUser)
    this.newUser.username = '';
    this.newUser.password = '';
  }

}
