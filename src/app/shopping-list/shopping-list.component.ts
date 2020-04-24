import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredient();
    this.shoppingListService.ingredientChanged.
    subscribe(
      (newIngredients : Ingredient[]) => {
        this.ingredients = newIngredients;
      }
    );
  }

  // onIngredientAdded(ingredient: Ingredient) {
  //   this.ingredients.push(ingredient);
  // }
  onEditItem(index : number){
    //emitting subject on edit click and notifying in service
    //which will be listended by any component ang can get id by listing to it  in this example it is listining in shop edit comp
    this.shoppingListService.startEditing.next(index);
  }

}
