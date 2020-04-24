import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  //to destroy subscription on component destroy we store subscription in field
  subscription : Subscription;

  //to populate get by id data in template f is ref of form in template
  @ViewChild('f') editForm : NgForm;

  editMode = false;
  editedItemIndex : number;
  editedItem : Ingredient;


  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startEditing.
    subscribe((index : number )=>{
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredientById(index);
      this.editForm.setValue({
        name : this.editedItem.name,
        amount : this.editedItem.amount

      })
    })
  }

  onAddItem(form : NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    }else{
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();

    // this.ingredientAdded.emit(newIngredient);
  }
  onClear(){
    this.editForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe;
  }

}
