import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

  constructor(private http : HttpClient) { }

  apikey = 'AIzaSyCCD9gBJqlFKuzo8nrTOL6TZ53JrGgcOSE';

  signup(email : string, password :string){
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+this.apikey,
    {
      email : email,
      password : password,
      returnSecureToken : true
    }).pipe(catchError(this.handleError));
  }

  login(email : string, password : string){
   return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+this.apikey,
    {
      email : email,
      password : password,
      returnSecureToken : true
    }).pipe(catchError(this.handleError));
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

