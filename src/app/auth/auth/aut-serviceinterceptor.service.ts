import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { exhaustMap, map, take } from 'rxjs/operators';
import * as fromApp from '../../Store/App.reducer'
import { Store } from '@ngrx/store';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    constructor(private store:Store<fromApp.AppState>){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
           return this.store.select('Auth').pipe(
            take(1),
            map(authState=>
                {
                    return authState.user
                }),
            exhaustMap(user=>
                {
                    if(!user)
                    {
                        return next.handle(req);
                    }
                  const ModifiedRequest=req.clone({
                       params:new HttpParams().set('auth',user.token)
                })

                   return next.handle(ModifiedRequest);
                }));
        
              }
}