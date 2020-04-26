import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipestartComponent } from './recipes/recipestart/recipestart.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { AuthComponent } from './auth/auth.component';


const routes: Routes = [
  {path : '', redirectTo : '/recipes', pathMatch : 'full'},//since empty path is common for each path so
  //we are checking load this if complete path is empty   so used pathMatch =full
  {path : 'recipes', component : RecipesComponent,
    children :[
      {path : '', component : RecipestartComponent},
      {path : 'new', component : RecipeEditComponent}, //if we place this component after :id one then angular will take new as id and throw error
     //resolver is added and when this route is activated data gets loaded through resolver
      {path : ':id', component : RecipeDetailComponent, resolve : [RecipeResolverService]},
      {path : ':id/edit', component : RecipeEditComponent}
    ]},
  {path : 'shopping-list', component : ShoppingListComponent},
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
