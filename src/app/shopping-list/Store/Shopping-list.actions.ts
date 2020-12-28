
import { Action } from "@ngrx/store";

import { Ingredient } from "../../shared/ingredient.model";

export const ADD_Ingredient='[shoppingList] ADD_Ingredient'

export const ADD_Ingredients='[shoppingList] ADD_Ingredients'

export const Update_Ingredient='[shoppingList] Update_Ingredient'

export const Delete_Ingredient='[shoppingList] Delete_Ingredient'

export const Start_Edit='[shoppingList] Start_Edit'

export const Stop_Edit='[shoppingList] Stop_Edit'


export class AddIngredient implements Action{

    readonly type= ADD_Ingredient;
    
    constructor(public payload:Ingredient){
    
}
}

export class AddIngredients implements Action{

    readonly type= ADD_Ingredients;
    
    constructor(public payload:Ingredient[]){

    }
    
}

export class UpdateIngredient implements Action{

     readonly type=Update_Ingredient;

     constructor(public payload:Ingredient){
        
    }
}

export class DeleteIngredient implements Action{
    readonly type=Delete_Ingredient;

    
}


export class StartEdit implements Action{
    readonly type=Start_Edit
    constructor(public payload:number){

    }
}

export class StopEdit implements Action{
    readonly type=Stop_Edit
}

//export type ShoppingListActionTypes = AddIngredient | AddIngredients | UpdateIngredient | DeleteIngredient