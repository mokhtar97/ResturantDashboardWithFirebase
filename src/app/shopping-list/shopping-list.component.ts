import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './Store/Shopping-list.actions';
import * as fromApp from '../Store/App.reducer';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingrediants: Observable<{ ingredients: Ingredient[] }>;
  private MySubscription: Subscription;
  constructor(private store: Store<fromApp.AppState>) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.ingrediants = this.store.select('ShoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
  onIngrediantAdded(ingred: Ingredient) {
    this.store.dispatch(new ShoppingListActions.AddIngredient(ingred));
  }
}
