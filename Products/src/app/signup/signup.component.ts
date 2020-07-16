import { Component, OnInit } from '@angular/core';
import{UserService} from '../user.service'
import{Router}from '@angular/router'
import{UserModel}from '../signup/user.model'

import { from } from 'rxjs';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
title:String="SignUp"
  constructor(private userservice:UserService, private router:Router) { }
  userItem=new UserModel(null,null,null,null);
 
 
  ngOnInit(): void {
  }
  SignupValidate(){



this.userservice.signuser(this.userItem)
.subscribe(
  (res:any) =>{
    console.log(res);
    localStorage.setItem('token',res.token)
    console.log('signed up successfully');
    alert('signed up successfully');
    this.router.navigate(['/login']);},
    err=>console.log(err)
  
)

}
  }

