import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './recipe.model';
import { DataStorageService } from '../shared/data-storage.service';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]>{
//To load data through resolver it actually call the service and load data before loading component in case the component is directly not interacting with data
//in this example first we are loading recipe then recipe detail but when we are in recipe details screen and
//refresh the pages the data will not be fetched because fetching is done in recipe list so we are using resolvet to load data
  constructor(
    private dataStorageService: DataStorageService,
    private recipesService: RecipeService
  ) {}


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //loading recipe
    const recipes = this.recipesService.getRecipe();
    if (recipes.length === 0) {
      return this.dataStorageService.fetchRecipes();
    } else {
      return recipes;
    }
  }


}
