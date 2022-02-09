import { Component, OnInit } from '@angular/core';
import { UserAPIService } from '../user-api.service';
import { UserLogin } from '../user-login';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  allUsers: UserLogin[] = [];

  constructor(private userapi: UserAPIService) { }

  ngOnInit(): void {
    this.refreshUserList();
  }

  refreshUserList(){
    this.userapi.GetUsers(
      (results: any) => {
        this.allUsers = results;
      }
    )
  }

}
