import * as FromShoppingListReducer from '../shopping-list/Store/Shopping-list.reducer';
import * as FromRecipeReducer from '../recipes/Store/recipes.reducer'
import * as FromAuthReducer from '../auth/Store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState{
    ShoppingList:FromShoppingListReducer.State;
    Recipe:FromRecipeReducer.State,
    Auth:FromAuthReducer.State
}

export const appReducers:ActionReducerMap<AppState>={
    ShoppingList:FromShoppingListReducer.ShoppingListReducer,
    Recipe:FromRecipeReducer.RecipeReducer,
    Auth:FromAuthReducer.authReducer
}