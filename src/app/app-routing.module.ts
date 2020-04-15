import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';


const routes: Routes = [
  {path : '', redirectTo : '/recipes', pathMatch : 'full'},//since empty path is common for each path so
  {path : 'recipes', component : RecipesComponent},
  {path : 'shopping-list', component : ShoppingListComponent},     //we are checking load this if complete path is empty
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
