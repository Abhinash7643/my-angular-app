import { Component, OnInit, OnDestroy} from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private userSubs : Subscription;


  constructor(
    private dataStotageService : DataStorageService,
    private authService : AuthService ) { }

  ngOnInit() {
      this.userSubs =  this.authService.user.subscribe(user =>{
        //both are same
          // this.isLoggedIn = !user ? false : true;
          this.isLoggedIn = !!user;
        }
      );
  }

  onSaveData(){
    this.dataStotageService.storeRecipes();
  }

  onFetchData(){
    this.dataStotageService.fetchRecipes().subscribe();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.userSubs.unsubscribe();
  }

}
