import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from './user-login';
import { Pokemon } from './pokemonmembers';

@Injectable({
	providedIn: 'root'
})
export class UserAPIService {

	currentUser: UserLogin | null = {
		id: 1,
		username: "test",
		password: "test"
	};

	constructor(private http: HttpClient) { }

	AddUser(newUser: UserLogin, cb: any){
		this.http.post<UserLogin[]>('https://localhost:5001/userlogin', newUser).subscribe(cb)
	}

	DeleteUser(id: number, cb: any){
		this.http.delete(`https://localhost:5001/userlogin?id=${id}`).subscribe(cb)
	}

	GetUsers(cb: any){  
		this.http.get<UserLogin[]>('https://localhost:5001/userlogin').subscribe(cb)
	}

	listTeam(userid: number, cb: any){
		this.http.get<Pokemon[]>(`https://localhost:5001/userlogin/teamlist?userid=${userid}`).subscribe(cb)
	}

	UpdateCurrentUser(user: UserLogin) {
		this.currentUser = user;
	}
}
