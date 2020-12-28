import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute,Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipes-list/recipe.model';
import * as fromApp from '../../Store/App.reducer';
import * as fromRecipeActions from '../Store/recipes.actions'
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
 id:number;
 editMode=false; 
 RecipeForm:FormGroup;
 RecipeIngredients:FormArray;
 
  constructor(private route:ActivatedRoute
      ,private router:Router
      ,private store:Store<fromApp.AppState>) {
        
       }

  ngOnInit(): void {
    this.initForm()
    this.route.params.subscribe(
      (params:Params)=>{
        this.id= +params['id'];
       this.editMode= params['id'] != null;
       this.initForm()
       console.log(this.editMode);
      }
    )
  }
  initForm()
  {
    
    let recipeName='';
    let recipeImagePath='';
    let recipeDescription='';
    this.RecipeIngredients=new FormArray([])
    if(this.editMode)
    {
       //const recipe=this.recipeSRV.getRecipe(this.id)


      this.store.select('Recipe')
       .pipe(
        map(recipeState=>{
         return recipeState.Recipes.find((recipe,index)=>{
         return index === this.id
         });
        })
       ).subscribe(recipe=>{
        recipeName=recipe.name
        recipeImagePath=recipe.ImagePath
        recipeDescription=recipe.description
        if(recipe['Ingrediants'])
        {
          for(let ingrediant of recipe.Ingrediants)
          {
            this.RecipeIngredients.push(
              new FormGroup({
                'name':new FormControl(ingrediant.name,Validators.required),
                'amount':new FormControl(ingrediant.amount,Validators.required),
              })
            )
          }
        }

       })
       

        
    }

    this.RecipeForm=new FormGroup({
      'name':new FormControl(recipeName,Validators.required),
      'imagepath':new FormControl(recipeImagePath,Validators.required),
      'description':new FormControl(recipeDescription,Validators.required),
      'ingrediants':this.RecipeIngredients,
    });
   
  }

  getIngrediants()
  {
    return this.RecipeIngredients
  }
  
  AddIngredient()
  {
    this.RecipeIngredients.push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,[
            Validators.required,
            Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
      })
    )
  }
 

  DeleteIngrediant(index:number)
  {
    this.RecipeIngredients.removeAt(index)
  }

  onSubmit()
  {
    const newRecipe:Recipe=new Recipe(this.RecipeForm.value['name'],this.RecipeForm.value['description'],this.RecipeForm.value['imagepath'],this.RecipeForm.value['ingrediants'])
    if(this.editMode)
    {
        //this.recipeSRV.UpdateRecipe(this.id,newRecipe)
        this.store.dispatch(new fromRecipeActions.UpdateRecipe({index:this.id , recipe:newRecipe}))
    }else
    {
      //this.recipeSRV.AddRecipe(newRecipe)
      this.store.dispatch(new fromRecipeActions.AddRecipe(newRecipe))
    }
    this.onCancel()
  }

  onCancel()
  {
    this.router.navigate(['../'], { relativeTo:this.route})
  }
}
