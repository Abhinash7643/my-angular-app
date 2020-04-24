import { Component, OnInit} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(
    private recipeService : RecipeService,
     private router : Router,
     private route : ActivatedRoute) { }

  ngOnInit() {

    //we are adding recipe from recipe edit component and after adding we are emitting event
    //that we are listining here to get updated  Recipe List
    this.recipeService.recipesChanged.subscribe(
      (recipe : Recipe[])=>{
        this.recipes = recipe;
      }
    )
    this.recipes = this.recipeService.getRecipe();
  }

  onNewRecipe(){
    this.router.navigate(['new'], {relativeTo : this.route}) //since we are already on /recipe so we are using repative route
                                   //so we need to inform router about current route using relative to
  }




}
