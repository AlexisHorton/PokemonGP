import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { UserHomepageComponent } from './user-homepage/user-homepage.component';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  { path: 'userlogin', component: UserLoginComponent },
  { path: '', component: AppComponent},
  { path: 'home', component: HomePageComponent}
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes), 
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
