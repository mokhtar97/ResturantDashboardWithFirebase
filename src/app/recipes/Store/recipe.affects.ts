import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { Recipe } from '../recipes-list/recipe.model';
import * as fromRecipeActions from './recipes.actions'
import * as fromApp from '../../Store/App.reducer';
import { Store } from '@ngrx/store';
@Injectable()
export class RecipeEffects{

    @Effect()
    fetchRecipe=this.actions$.pipe(
        ofType(fromRecipeActions.Fectch_Recipe),
        switchMap(()=>{
            return this.http.get<Recipe[]>(
                'https://restaurantdashboard-3251a.firebaseio.com/recipes.json'
            );
        }),
        map(recipes => {
            return recipes.map(recipe => {
                return {
                    ...recipe,
                    Ingrediants: recipe.Ingrediants ?? recipe.Ingrediants
                }
            })
        }),
        map(recipes=>{
            return new fromRecipeActions.SetRecipes(recipes)
        })
    )



    @Effect({dispatch:false})
    StoreRecipes=this.actions$.pipe(
      
        ofType(fromRecipeActions.Store_Recipes),
        withLatestFrom(this.store.select('Recipe')),
        switchMap(([storeDate,RecipeState])=>{
            return this.http.put(
                'https://restaurantdashboard-3251a.firebaseio.com/recipes.json'
                , RecipeState.Recipes
            )


        })
    )
    constructor(public actions$:Actions, public http:HttpClient,public store:Store<fromApp.AppState>){

    }
}