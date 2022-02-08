import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from './user-login';
import { Pokemon } from './pokemonmembers';
import { UserLoginComponent } from './user-login/user-login.component';

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {

  currentUser: string = '';

  constructor(private http: HttpClient) { }

  AddUser(newUser: UserLogin, cb: any){
    this.http.post<UserLogin[]>('https://localhost:44347/userlogin', newUser).subscribe(cb)
  }

  DeleteUser(id: number, cb: any){
    this.http.delete(`https://localhost:44347/userlogin?id=${id}`).subscribe(cb)
  }

  GetUsers(cb: any){  
    this.http.get<UserLogin[]>('https://localhost:44347/userlogin').subscribe(cb)
  }

  GetAUser(username: string, password: string, cb:any){
    this.http.get<boolean>(`https://localhost:44347/userlogin/${username}/${password}`).subscribe(
      (result) => {
        if (result == true){
          this.currentUser = username;
          cb(true);
        }
        else {
          cb(false);
        }
      }
    )
  }

  listTeam(userid: number, cb: any){
    this.http.get<Pokemon[]>(`https://localhost:44347/userlogin/teamlist?id=${userid}`).subscribe(cb)
  }
}
