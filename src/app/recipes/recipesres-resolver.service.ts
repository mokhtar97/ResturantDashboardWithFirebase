import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { Recipe } from './recipes-list/recipe.model';
import * as fromApp from '../Store/App.reducer'
import * as fromRecipeActions from '../recipes/Store/recipes.actions'
import { Actions, ofType } from '@ngrx/effects';
import { switchMap, take ,map } from 'rxjs/operators';
@Injectable({providedIn:'root'})

export class RecipeResolver implements Resolve<Recipe[]>{
    constructor(private store:Store<fromApp.AppState>,
                private actions$:Actions){

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
     return this.store.select('Recipe').pipe(
            take(1),
            map(recipesState => {
              return recipesState.Recipes;
            }),
            switchMap((recipes) => {
               if (recipes.length === 0) {
                 this.store.dispatch(new fromRecipeActions.FetchRecipe());
                return this.actions$.pipe(
                   ofType(fromRecipeActions.Set_Recipes),
                   take(1)
                 );
               } else {
                 return of(recipes);
               }
            })
           );
    }
}