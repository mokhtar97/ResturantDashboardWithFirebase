
import { Ingredient } from '../../../app/shared/ingredient.model'
import * as ShoppingListActions from './Shopping-list.actions'


export interface State{
    ingredients:Ingredient[];
    editedIngredient:Ingredient;
    editedIngredientIndex:number
}

const initialState:State = {
    ingredients: [
        new Ingredient('Apples', 15),
        new Ingredient('Orange', 20),
        new Ingredient('Banana', 50)
    ],
    editedIngredient:null,
    editedIngredientIndex:-1
}

export function ShoppingListReducer(state:State=initialState, action:any) {
    
    switch (action.type) {
        case ShoppingListActions.ADD_Ingredient:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListActions.ADD_Ingredients:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
       case ShoppingListActions.Update_Ingredient:
        
            const ingredient=state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload
            };

            const updatedIngredients=[ ...state.ingredients]
            updatedIngredients[state.editedIngredientIndex]=updatedIngredient
            return {
                ...state,
                ingredients:updatedIngredients,
                editedIngredient:null,
                editedIngredientIndex:-1
            };

        case ShoppingListActions.Delete_Ingredient:
           
            return {
                ...state,
                ingredients: state.ingredients.filter((ig,igIndex)=>{
                    return igIndex !== state.editedIngredientIndex
                }),
                editedIngredient:null,
                editedIngredientIndex:-1
            }
           
        case ShoppingListActions.Start_Edit:
          
            return{
               ...state,
               editedIngredientIndex: action.payload,
               editedIngredient: {...state.ingredients[action.payload]} 
            };
            
       case ShoppingListActions.Stop_Edit:
           console.log("adds"+state.ingredients)
            return{
                ...state,
                editedIngredient:null, 
                editedIngredientIndex:-1
            }

        default:
            return state;
    }

}