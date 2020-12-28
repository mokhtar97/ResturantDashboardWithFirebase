import { Action } from '@ngrx/store' 
import { Recipe } from '../recipes-list/recipe.model'

export const Set_Recipes="[Recipe] setRecipes"
export const Add_Recipe="[Recipe] AddRecipe"
export const Update_Recipe="[Recipe] UpdateRecipe"
export const Delete_Recipe="[Recipe] DeleteRecipe"
export const Fectch_Recipe="[Recipe] Fectch Recipe"
export const Store_Recipes="[Recipe] Store Recipe"

export class SetRecipes implements Action{
 readonly type=Set_Recipes
  constructor(public payload:Recipe[]){

  }
}

export class AddRecipe implements Action{
    readonly type=Add_Recipe
    constructor(public payload:Recipe){

    }
}

export class UpdateRecipe implements Action{
    readonly type=Update_Recipe
    constructor(public payload:{index:number; recipe:Recipe}){

    }
}

export class DeleteRecipe implements Action{
    readonly type=Delete_Recipe
    constructor(public payload:number){

    }
}

export class FetchRecipe implements Action{
    readonly type=Fectch_Recipe
}

export class StoreRecipe implements Action{
    readonly type=Store_Recipes
}
export type RecipeActions= SetRecipes | AddRecipe | UpdateRecipe | DeleteRecipe