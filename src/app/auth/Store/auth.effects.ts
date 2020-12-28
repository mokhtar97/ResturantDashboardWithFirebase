import { HttpClient } from '@angular/common/http'
 import { Injectable } from '@angular/core'
 import { Router } from '@angular/router'
 import { Actions, Effect, ofType } from '@ngrx/effects'
import { of } from 'rxjs'
import { catchError, map, switchMap,tap } from 'rxjs/operators'
import { AuthService } from '../auth.service'
import { User } from '../auth/user-model'

 import * as AuthActions from '../Store/auth.actions'

export interface AuthresponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: string;
}

const handleError=(httperrorResponse:any)=>{
  let errormsg = 'unknown Error Occurred';
  if (!httperrorResponse.error || !httperrorResponse.error.error) {
    return of(new AuthActions.AuthenticateFailed(errormsg));
  }
  switch (httperrorResponse.error.error.message) {

    case 'EMAIL_EXISTS':
      errormsg = 'this email alreadyt exist';
      break;
    case 'EMAIL_NOT_FOUND':
      errormsg = 'this email does not exist';
      break;
    case 'INVALID_PASSWORD':
      errormsg = 'this is incorrect password'
      break;
    case 'USER_DISABLED':
      errormsg = 'this user is disabled'
      break;
  }
  return of(new AuthActions.AuthenticateFailed(errormsg));
}

const handleAuthentication=(resData:any)=>{
  const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);

  const user=new User(resData.email,resData.localId,resData.idToken,expirationDate)
  localStorage.setItem('userData',JSON.stringify(user))

        return new AuthActions.AuthenticateSuccess({
          email: resData.email,
          id: resData.localId,
          _token: resData.idToken,
          _tokenExpirationDate: expirationDate,
          redirect:true
})


}
 
@Injectable()
export class AuthEffects {

  
  @Effect()
  authSignup=this.AuthEffectActions$.pipe(
    ofType(AuthActions.SignUp_Start),
    switchMap((signupData:AuthActions.SignUpStart)=>
     this.http.post<AuthresponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDFxsnwAqnGv-hzMl3u5VYbDWyYB2kJObs',
    {
        email: signupData.payload.email,
        password: signupData.payload.password,
        returnSecureToken: true
    }).pipe(
      tap((resData)=>{
        this.authService.setLogoutTimer( +resData.expiresIn *1000)
       }),
      map((resData)=>{
       return handleAuthentication(resData)
      }),
     catchError((errRes)=>{
      return handleError(errRes)
     })
  ))
)

  
@Effect()
  authLogin = this.AuthEffectActions$.pipe(
    ofType(AuthActions.LOGIN_Start),
    switchMap((authData: AuthActions.LoginStart) =>
      this.http.post<AuthresponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDFxsnwAqnGv-hzMl3u5VYbDWyYB2kJObs',
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }).pipe(
          tap((resData)=>{
           this.authService.setLogoutTimer( +resData.expiresIn *1000)
          }),
          map((resData) =>{ 
            return handleAuthentication(resData)
          }),
          catchError(httperrorResponse =>{
           return handleError(httperrorResponse)
          })
        ))
  )


  @Effect({ dispatch: false })
  authRedirect = this.AuthEffectActions$.pipe(
    ofType(AuthActions.Authenticate_Success),
    tap((authSuccess:AuthActions.AuthenticateSuccess) => {
      if(authSuccess.payload.redirect)
      this.router.navigate(['/']);
    }) 
  );

  @Effect()
  autologin=this.AuthEffectActions$.pipe(
    ofType(AuthActions.auto_Login),
    map(()=>{

        const userData:{
          email:string;
          id:string;
          _token:string;
          _tokenExpirationDate:Date
    }
    =JSON.parse(localStorage.getItem('userData'));
    if(!userData)
    {
      return { type :'dummy'};
    }
    const loadedUser=new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
    if(loadedUser.token)
    {
       const expduration=new Date(userData._tokenExpirationDate).getTime()-new Date().getTime();
       this.authService.setLogoutTimer(expduration)
       // this.autologout(expduration)
        //this.user.next(loadedUser);
        return new AuthActions.AuthenticateSuccess(
            {email:loadedUser.email , id:loadedUser.id,
                  _token:loadedUser.token,
                  _tokenExpirationDate:userData._tokenExpirationDate,
                  redirect:false
                });
     }
     return { type :'dummy'};
    })
  );
  
  @Effect({ dispatch:false })
  logOut= this.AuthEffectActions$.pipe(
    ofType(AuthActions.LOGOUt),
    tap(()=>{
      this.authService.clearLogoutTimer()
       localStorage.removeItem('userData')
       this.router.navigate(['/auth']);
    })
  )

  constructor(private AuthEffectActions$: Actions, private http: HttpClient, private router: Router,private authService:AuthService) {

  }
 }