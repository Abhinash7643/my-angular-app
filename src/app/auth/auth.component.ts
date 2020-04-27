import { Component, OnInit } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;

  constructor(private authService : AuthService, private router : Router) { }

  authSubs : Observable<AuthResponseData>;

  ngOnInit(): void {
  }

  switchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  // onSubmit(form : NgForm){
  //   if(!form.valid){
  //     return;
  //   }
  //   const email = form.value.email;
  //   const password = form.value.password;
  //   console.log('submitting form'+ form.value);

  //   this.isLoading = true;
  //   if(this.isLoginMode){
  //     this.authService.login(email, password).subscribe(
  //       resData =>{
  //         console.log(resData);
  //         this.isLoading = false;
  //       },
  //       //because we are throwing error from service
  //       errorMessage =>{
  //         console.log(errorMessage);
  //         this.error = errorMessage;
  //         this.isLoading = false;
  //       }
  //     )
  //   }else{
  //     this.authService.signup(email, password).subscribe(
  //       resData =>{
  //         console.log(resData);
  //         this.isLoading = false;
  //       },
  //       //because we are throwing error from service
  //       errorMessage =>{
  //         console.log(errorMessage);
  //         this.error = errorMessage;
  //         this.isLoading = false;
  //       }
  //     )
  //   }

  //   form.reset();
  // }


  //above code is improved since bot observabe is of same type for login and signup
  //so we store observable in some authObs and we subscrided because we know any one going to excute either login or signup
  onSubmit(form : NgForm){
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log('submitting form'+ form.value);

    this.isLoading = true;

    if(this.isLoginMode){
      this.authSubs = this.authService.login(email, password);
    }else{
     this.authSubs =  this.authService.signup(email, password);
    }
    this.authSubs.subscribe(
      resData =>{
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      //because we are throwing error from service
      errorMessage =>{
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    )

    form.reset();
  }





}
