import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from './user-login';
import { Pokemon } from './pokemonmembers';
import { UserLoginComponent } from './user-login/user-login.component';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserAPIService {

  currentUser: string = '';
  currentUserID: number = 0;
  current_User: UserLogin | null = null;
  teamcount: number = 0;


  constructor(private http: HttpClient) { }

  AddUser(newUser: UserLogin, cb: any){
    this.http.post<UserLogin[]>(`${environment.apiUrl}/userlogin`, newUser).subscribe(cb)
  }
  DeleteUser(id: number, cb: any){
    this.http.delete(`${environment.apiUrl}/userlogin?id=${id}`).subscribe(cb)
  }
  GetUsers(cb: any){  
    this.http.get<UserLogin[]>(`${environment.apiUrl}/userlogin`).subscribe(cb)
  }
  GetAUser(username: string, password: string, cb:any){
    this.http.get<UserLogin>(`${environment.apiUrl}/userlogin/${username}/${password}`).subscribe(
      (result) => {
        if (result.username == username && result.password == password){
          this.currentUser = username;
          this.currentUserID = result.id;
          cb(true);
        }
        else {
          cb(false);
        }
      }
    )
  }
  listTeam(userid: number, cb: any){
    this.http.get<Pokemon[]>(`${environment.apiUrl}/userlogin/teamlist?userID=${userid}`).subscribe(cb)
  }
}