import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken : string;
  email : string;
  refreshToken : string;
  expiresIn : string;
  localId : string;
  //because registered field will come incase of login only
  registered? : boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  tokenExpirationTimer = null;

  constructor(private http : HttpClient, private router : Router) { }

  apikey = 'AIzaSyCCD9gBJqlFKuzo8nrTOL6TZ53JrGgcOSE';

  signup(email : string, password :string){
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+this.apikey,
    {
      email : email,
      password : password,
      returnSecureToken : true
    })
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    );
  }

  login(email : string, password : string){
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+this.apikey,
    {
      email : email,
      password : password,
      returnSecureToken : true
    }).pipe(catchError(this.handleError),
    tap(resData => {
      this.handleAuthentication(
        resData.email,
        resData.localId,
        resData.idToken,
        +resData.expiresIn
      );
    })
    );
  }

  autoLogin(){
    const userData :{
       email: string;
       id: string;
       _token: string;
       _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData){
      return;
    }
    const loggedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if(loggedUser.token){
      this.user.next(loggedUser);
       //checking if token is there and and expiration time is left or not if not left do logout
       const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
       this.autoLogout(expirationDuration);
    }
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    // localStorage.clear();  to clear all data in local storage
    localStorage.removeItem('userData');

    //since we dont want to auto logout method execute when we specifically logout so we are assigning it to null when logout
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }


  //after some time app willl be auto logout
  autoLogout(expirationDuration : number){
    this.tokenExpirationTimer = setTimeout(()=>{
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    //Stringfy is used to convert into json we cannot store object
    localStorage.setItem('userData', JSON.stringify(user));
  }

  //sharing error handling in both signup and login you can go below to seen signup without using common method

  private handleError(errorResponse : HttpErrorResponse){
    //the pattern error.error in in the response of api so followed that it can be different for other apis
    let errorMessage = 'An Unknown Error Occured';
    //checking if network error because if network error we will not get emain exist error will break app so checked
    if(!errorResponse.error || !errorResponse.error.error){
      return throwError(errorMessage);
    }
    //case also debends or error response what error type can be
    switch(errorResponse.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage = 'This Email Exist Already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This Email Does not Esit';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The Password is not correct';
        break;
    }
    return throwError(errorMessage);
   }
  /*  */

  // signup(email : string, password :string){
  //   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+this.apikey,
  //    {
  //      email : email,
  //      password : password,
  //      returnSecureToken : true
  //    }).pipe(catchError(errorResponse => {
  //      //the pattern error.error in in the response of api so followed that it can be different for other apis
  //        let errorMessage = 'An Unknown Error Occured';
  //        //checking if network error because if network error we will not get emain exist error will break app so checked
  //        if(!errorResponse.error || !errorResponse.error.error){
  //          return throwError(errorMessage);
  //        }
  //        switch(errorResponse.error.error.message){
  //          case 'EMAIL_EXISTS':
  //            errorMessage = 'This Email Exist Already';
  //        }
  //        return throwError(errorMessage);
  //       }))
  //  }
}

