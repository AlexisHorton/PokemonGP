import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAPIService } from '../user-api.service';
import { UserLogin } from '../user-login';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  showCreateButton: boolean = false;
  redirectUrl: any = 'http://localhost:4200/home';
  token: any;

  allUsers: UserLogin[] = [];

  newUser: UserLogin = {
    id: 0,
    username: '',
    password: ''
  }

  loginUser: string = '';
  loginPassword: string = '';

  @Output() AddUser: EventEmitter<UserLogin> = new EventEmitter<UserLogin>();

  constructor(private userapi: UserAPIService, private Route: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.queryParams.subscribe(params=>{
    //   this.loginPassword = params['loginPassword'];
    //   this.loginUser = params['loginUser'];
    //   this.redirectUrl = params['next'];
    // })
    this.refreshUserList();
  }

  refreshUserList(){
    this.userapi.GetUsers(
      (results: any) => {
        this.allUsers = results;
      }
    )
  }

  addUser(newUser: UserLogin){
    this.userapi.AddUser(newUser,
      () => {
        this.refreshUserList();
      })
    alert("User added!")
    this.newUser.username = '';
    this.newUser.password = '';
  }

  signIn(){
    this.userapi.GetAUser(this.loginUser, this.loginPassword, 
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
