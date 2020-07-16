import { Component, OnInit } from '@angular/core';
import{UserService} from '../user.service'
import{Router}from '@angular/router'
import{UserModel}from '../signup/user.model'
import{FormBuilder,Validators} from '@angular/forms'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title:String="Login here"





  constructor(private userservice:UserService, private router:Router ,private fb:FormBuilder) { }
  userItem=new UserModel(null,null,null,null);
  
  loginForm=this.fb.group(
    {
    email:[' ',[Validators.required,Validators.pattern('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$')]],
    password:[' ',[Validators.required,Validators.minLength(6)]]
  })
  
  
  
  
  
  ngOnInit(): void {
  }
  LoginValidate(){
    this.userservice.loginuser(this.userItem)
    .subscribe(
      (res:any)=>{
        if(res.token)
        {
          localStorage.setItem('token',res.token),
          this.router.navigate(['/edit']);
          console.log('login successfully');
        }
        else{
          console.log("Invalid entry");
        }
      }
    ) 
  }
}
