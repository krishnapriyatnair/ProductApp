import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import{Router}from '@angular/router';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient, private router:Router) { }

  signuser(item){
    return this.http.post("http://localhost:3000/signup",{"user":item})
  
  }

  loginuser(item){
    return this.http.post("http://localhost:3000/login",{"user":item})
  
  }

loggedIn(){
  return !!localStorage.getItem('token')
}
logout(){
localStorage.removeItem('token')
this.router.navigate(['/']);
}


getToken(){

  return localStorage.getItem('token');
}


}
