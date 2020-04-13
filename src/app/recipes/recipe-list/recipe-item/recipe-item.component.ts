import { Component, OnInit, Input} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;

  constructor(private recipeService : RecipeService) { }

  ngOnInit() {
  }

  //On select we are emitting which recipe is selected here on clicking on recipe
  onSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
