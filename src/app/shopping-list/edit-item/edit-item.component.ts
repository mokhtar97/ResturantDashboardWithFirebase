import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import * as ShoppingListActions from '../Store/Shopping-list.actions'
import * as fromApp from '../../Store/App.reducer'
@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit,OnDestroy {

  //@ViewChild('nameInput') nameInputRef:ElementRef; 
  //@ViewChild('amountInput') amountInputRef:ElementRef; 
  @ViewChild('f') slForm:NgForm;
  subscription:Subscription;
  EditedMode:boolean=false;
  EditedItem:Ingredient;
  constructor(private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
      this.store.select('ShoppingList').subscribe(resData=>{
        if(resData.editedIngredientIndex > -1)
        {
          this.EditedMode=true;
          this.EditedItem=resData.editedIngredient
          this.slForm.setValue({
            name:this.EditedItem.name,
            amount:this.EditedItem.amount
            
          })
        }
        else
        {
          this.EditedMode=false
        }
      })
      
      // this.subscription=this.IngredSRV.StartedEditChanged
      //  .subscribe(
      //    (index:number)=>{
      //      this.EditedItemIndex=index;
      //      this.EditedMode=true;
      //      this.EditedItem=this.IngredSRV.getIngrediant(index);
           
      //    }
      //  )
  }

onSubmit(form:NgForm)
{
  //const name=this.nameInputRef.nativeElement.value;
  //const amount=this.amountInputRef.nativeElement.value;
  const name=form.value.name;
  const amount=form.value.amount;
  const ingred=new Ingredient(name,amount);
  if(this.EditedMode)
  {
    //this.IngredSRV.UpdateIngrediant(this.EditedItemIndex,ingred)
    //console.log(ingred)
    this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingred))
  }
  else{
    this.store.dispatch(new ShoppingListActions.AddIngredient(ingred))
    //this.IngredSRV.addIngredient(ingred);
  }
  this.EditedMode=false;
  form.reset();
}

ngOnDestroy(): void {
  //this.subscription.unsubscribe();
  this.store.dispatch(new ShoppingListActions.StopEdit())
}

onClear()
{
  this.EditedMode=false;
  this.slForm.reset();
  this.store.dispatch(new ShoppingListActions.StopEdit())

}

onDelete(){
  //this.IngredSRV.DeleteIngrediant(this.EditedItemIndex);

  this.store.dispatch(new ShoppingListActions.DeleteIngredient())
  this.onClear();

}
}
