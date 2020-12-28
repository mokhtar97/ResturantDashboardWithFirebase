import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import * as fromApp from '../../Store/App.reducer'
import { Store } from '@ngrx/store';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private authSRV: AuthService, private route: Router,private store:Store<fromApp.AppState>) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //return this.authSRV.user.pipe(
    return this.store.select('Auth').pipe(  
      take(1),
      map(authState=>{
        return authState.user
      }),
      map(user => {
        return !!user;
      }), tap(isAuth => {
        if (!isAuth) {
          this.route.navigate(['/auth'])
        }

      }
      )
    )
  }

}
