import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http : HttpClient,
    private recipeService : RecipeService,
    private authService : AuthService) { }

    storeRecipes() {
      const recipes = this.recipeService.getRecipe();
      this.http
        .put(
          'https://my-angular-app-428fe.firebaseio.com/recipes.json',
          recipes
        )
        .subscribe(response => {
          console.log(response);
        });
    }



    //chaining of observable
    //first subscribing to user to get token
    //take is used to get one value from observable the it should unsubscribe automatically
    //it waits for first observable to complete then execute second observable
    //after first observable complete it unsubscribe so later we will have one observable
    fetchRecipes() {
      return this.authService.user.pipe(
        take(1),
        exhaustMap(user => {
          return this.http.get<Recipe[]>(
            'https://my-angular-app-428fe.firebaseio.com/recipes.json',
            {
              params: new HttpParams().set('auth', user.token)
            }
          );
        }),
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipe(recipes);
        })
      );
    }



    //later 222

    // fetchRecipes() {
    //   return this.http
    //     .get<Recipe[]>(
    //       'https://my-angular-app-428fe.firebaseio.com/recipes.json'
    //     )
    //     .pipe(
    //       map(recipes => {
    //         return recipes.map(recipe => {
    //           return {
    //             ...recipe,
    //             ingredients: recipe.ingredients ? recipe.ingredients : []
    //           };
    //         });
    //       }),
    //       tap(recipes => {
    //         this.recipeService.setRecipe(recipes);
    //       })
    //     )
    // }



    //111
    // fetchRecipes(){
    //   this.http
    //   .get<Recipe[]>('https://my-angular-app-428fe.firebaseio.com/recipes.json')
    //   .pipe(map(recipes =>{ //this map is rxjs operator to transform result
    //     return recipes.map(recipe =>{//this map is just js method
    //       return {
    //         //we are transforming data to avois error in ingredient, if ingredient exist take it otherwise assigning empty array to avoiss=d error
    //         ...recipe,
    //         ingredients: recipe.ingredients ? recipe.ingredients : []
    //       };
    //     });
    //   }))
    //   .subscribe(recipes =>{
    //       this.recipeService.setRecipe(recipes);
    //     }
    //   )
    // }
}
