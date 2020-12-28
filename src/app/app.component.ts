import { Component, OnInit , Inject, PLATFORM_ID} from '@angular/core';
import { Store } from '@ngrx/store';
import { isPlatformBrowser} from '@angular/common'
import * as fromApp from './Store/App.reducer'
import * as AuthAction from './auth/Store/auth.actions'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store:Store<fromApp.AppState>,@Inject(PLATFORM_ID) private platformid)
  {

  }
  ngOnInit(): void {
   // this.authserv.autoLogin();
   if(isPlatformBrowser(this.platformid)){
    this.store.dispatch(new AuthAction.AutoLogin());
   }
    

    //first()(of(1, 2, 3)).subscribe((v) => console.log(`value: ${v}`));
  }
  title = 'FirstDemo';
  currentFeature:string='recipe'
  
  
}
