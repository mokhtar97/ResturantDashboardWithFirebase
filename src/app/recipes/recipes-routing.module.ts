import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from '../auth/auth/auth-guard.guard';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesDetailsComponent } from './recipes-details/recipes-details.component';
import { RecipesComponent } from './recipes.component';
import { RecipeResolver } from './recipesres-resolver.service';
import { StartRecipeComponent } from './start-recipe/start-recipe.component';

const routes: Routes = [

  {
      path: '',
       component: RecipesComponent,
      canActivate: [AuthGuardGuard],
      children: [
          { path: '', component: StartRecipeComponent },
          { path: 'new', component: RecipeEditComponent },
          {
              path: ':id/edit',
              component: RecipeEditComponent,
              resolve: [RecipeResolver]
          },
          {
              path: ':id',
              component: RecipesDetailsComponent,
              resolve: [RecipeResolver]
          }
      ]
  }

]
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class RecipesRoutingModule { }