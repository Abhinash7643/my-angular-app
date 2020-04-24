import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http : HttpClient,
    private recipeService : RecipeService) { }

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


    fetchRecipes() {
      return this.http
        .get<Recipe[]>(
          'https://my-angular-app-428fe.firebaseio.com/recipes.json'
        )
        .pipe(
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
        )
    }

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
