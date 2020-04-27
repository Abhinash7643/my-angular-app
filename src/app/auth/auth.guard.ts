import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate{

  constructor(private authService : AuthService, private router : Router){

  }

  canActivate(route :ActivatedRouteSnapshot, router : RouterStateSnapshot) :
  Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree{
    return this.authService.user.pipe(take(1),//since user will be emitted from so many place and we dont want from all so we will take latest and unsubscride
      map(user =>{
      const isAuth =!!user;
      if(isAuth){
        return true;
      }
      return this.router.createUrlTree(['/auth']);
    }))
    //we could have also used router.navigate

  }
}
