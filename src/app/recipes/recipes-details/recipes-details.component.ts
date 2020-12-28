import { Component, OnInit ,EventEmitter} from '@angular/core';
import { Recipe } from '../recipes-list/recipe.model';
import { Router, ActivatedRoute ,Params} from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../Store/App.reducer'
import * as fromRecipesActions from '../Store/recipes.actions'
import * as fromshoppingListActions from '../../shopping-list/Store/Shopping-list.actions'
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipes-details',
  templateUrl: './recipes-details.component.html',
  styleUrls: ['./recipes-details.component.css']
})
export class RecipesDetailsComponent implements OnInit {

 showRecipe:Recipe;
 id:number
  constructor(
    private route:Router,
    private router:ActivatedRoute,
    private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.router.params.subscribe(
      (params: Params)=>{
        this.id=+params['id'] ;
       // this.showRecipe= this.recipeSRV.getRecipe(this.id);
       this.store.select('Recipe').pipe(
         map(recipestate=>
          {
            return recipestate.Recipes.find((recipe,index)=>{
              return index === this.id
            })
          })
       ).subscribe(recipe=>
        this.showRecipe= recipe
       )
    }
    )
  }
  AddTOshopping()
  {
    this.store.dispatch(new fromshoppingListActions.AddIngredients(this.showRecipe.Ingrediants))
  }

  EditRecipe()
  {
   this.route.navigate(['edit'],{relativeTo:this.router}
   //this.route.navigate(['../',this.id,'edit'],{relativeTo:this.router}
   )
  }
  DeleteRecipe(){
    // this.recipeSRV.DeleteRecipe(this.id);
     this.store.dispatch(new fromRecipesActions.DeleteRecipe(this.id))
     this.route.navigate(['/recipes'])
  }
}
