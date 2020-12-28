import { Update_Ingredient } from 'src/app/shopping-list/Store/Shopping-list.actions';
import { Recipe } from '../recipes-list/recipe.model';
import * as fromRecipeActions from './recipes.actions';

export interface State {
  Recipes: Recipe[];
}

const initialState: State = {
  Recipes: [],
};
export function RecipeReducer(
  state: State = initialState,
  action: fromRecipeActions.RecipeActions
) {
  switch (action.type) {
    case fromRecipeActions.Set_Recipes:
      return {
        ...state,
        Recipes: [ ...action.payload],
      };
    case fromRecipeActions.Add_Recipe:
      return {
        ...state,
        Recipes: [...state.Recipes, action.payload],
      };
    case fromRecipeActions.Update_Recipe:
      const updatedRecipe = {
        ...state.Recipes[action.payload.index],
        ...action.payload.recipe,
      };
      const updated_Recipes = [...state.Recipes];
      updated_Recipes[action.payload.index] = updatedRecipe;
      return {
        ...state,
        Recipes: updated_Recipes,
      };
      case fromRecipeActions.Delete_Recipe:
          return{
              ...state,
              Recipes: state.Recipes.filter((ig,igIndex)=>{
                return igIndex !== action.payload
            }),
          };
    default:
      return state;
  }
}
