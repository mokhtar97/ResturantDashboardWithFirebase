import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { Recipe } from './recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromApp from '../../Store/App.reducer';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  @Output() selectedRecipe = new EventEmitter<Recipe>();
  public Recipes: Recipe[] = [];
  isloading = true;
  subscribtion: Subscription;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit(): void {
    this.subscribtion = this.store
      .select('Recipe')
      .pipe(map((recipesState) => recipesState.Recipes))
      .subscribe((recipes) => {
        this.Recipes = recipes;
      });
  }

  NewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
