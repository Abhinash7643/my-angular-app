import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  //it can be emitted from anywhere
  startEditing = new Subject<number>();
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  constructor() { }

  getIngredient(){
    return this.ingredients.slice();
  }

  addIngredient(ingredient : Ingredient){
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.ingredients.slice())
  }

  getIngredientById(index : number){
    return this.ingredients[index];
  }

  addIngredients(ingredients : Ingredient[]){
    // for(let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }can be used but we are emitting so many unnessary event
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.ingredients.slice())
  }

  updateIngredient(index : number, newIngredient : Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice())
  }

  //slice() will return a copy
  deleteIngredient(index : number){
    //splice it method to remove here it will delete 1 item starting fro index
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice())
  }
}
