import { Component, OnInit,EventEmitter ,Output} from '@angular/core';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as authActions from '../../auth/Store/auth.actions';
import * as fromApp from '../../Store/App.reducer'
import * as fromRecipeActions from '../../recipes/Store/recipes.actions'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() Selectedfeature= new EventEmitter<string>();
  isauthenticated:boolean=false
  constructor(private store:Store<fromApp.AppState>) { }
  ngOnInit(): void {
   
    //this.authsrv.user.subscribe(
      this.store.select('Auth').pipe(
        map(authState=>{
          return authState.user 
        })
      ).subscribe(
      user=>
      this.isauthenticated=!!user
    )
  }

  Onlogout()
  {
    this.store.dispatch(new authActions.Logout())
   // this.authsrv.logout();
  }

  OnSelected(feature:string)
  {
    this.Selectedfeature.emit(feature);
  }

  onSaveData(){
       //this.Datastorageservice.StoreData()
       this.store.dispatch(new fromRecipeActions.StoreRecipe())
  }
  onFetchdata(){
    // this.Datastorageservice.FetchData().subscribe()
    this.store.dispatch(new fromRecipeActions.FetchRecipe())
}

}
