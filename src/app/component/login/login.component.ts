import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl, Validators, FormBuilder  } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user:User
  loginForm:FormGroup;

  constructor(private formBuilder:FormBuilder,private toastrService:ToastrService,private authService:AuthService,private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  navigateToNotes(){
    this.router.navigate(['notes'])
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["",Validators.required],
      password:["",Validators.required]
    })
  } 

  login(){
    if(this.loginForm.valid){
      let loginModel :LoginModel= Object.assign({},this.loginForm.value)
      this.user=Object.assign({},this.loginForm.value)
      

      this.authService.login(loginModel).subscribe(response=>{
        this.toastrService.success(response.message,"Success")
        localStorage.setItem("token",response.data.token)
        
        this.authService.getUser(this.user).subscribe(response=>{
        localStorage.setItem("userId",response.data.userId)
        localStorage.setItem("firstName",response.data.firstName)
        localStorage.setItem("lastName",response.data.lastName)
        localStorage.setItem("email",response.data.email)

        this.navigateToNotes()
        },responseError=>{
         /* if(responseError.error.Errors.length>0){
            for (let i = 0; i <responseError.error.Errors.length; i++) {
              this.toastrService.error(responseError.error.Errors[i].ErrorMessage)
            }       
          } */
          this.toastrService.error(responseError.error)
        })

      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage)
          }       
        } 
      })
    }
    else{
      this.toastrService.error("Formunuz eksik","Dikkat")
    }
  }


}
