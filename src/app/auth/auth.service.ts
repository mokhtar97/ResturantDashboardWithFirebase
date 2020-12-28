import { Injectable } from '@angular/core';
import * as fromApp from '../Store/App.reducer'
import * as authActions from './Store/auth.actions'
import { Store } from '@ngrx/store';

export interface AuthresponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

    tokenExpirationDuration:any;
    constructor(private store:Store<fromApp.AppState>) {

    }
  

   setLogoutTimer(expirationDuration:number){
      this.tokenExpirationDuration= setTimeout(()=>
      this.store.dispatch(new authActions.Logout())
       ,expirationDuration)
    }

    clearLogoutTimer(){
        if(this.tokenExpirationDuration)
        {
            clearTimeout(this.tokenExpirationDuration)
            this.tokenExpirationDuration=null
        }
    }
    
}