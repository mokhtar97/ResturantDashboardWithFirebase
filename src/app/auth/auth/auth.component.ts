import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { AuthresponseData, AuthService } from '../auth.service';

import { Store } from '@ngrx/store';
import * as fromApp from '../../Store/App.reducer'
import * as fromAuthActions from '../Store/auth.actions'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit ,OnDestroy {

  islogin = false;
  isloading = false;
  num:number;
  error: string = ''
  subscribtion:Subscription
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnDestroy(): void {
    if(this.subscribtion)
    this.subscribtion.unsubscribe()
  }

  ngOnInit(): void {

    this.store.select('Auth').subscribe(authData => {
      console.log(authData)
      this.isloading = authData.isLoading;
      this.error = authData.messageError;
    })

  }
  onSubmit(form: NgForm) {

    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
   
    if (this.islogin) {
      //authObs = this.authsrv.login(email, password)
      this.store.dispatch(new fromAuthActions.LoginStart({ email: email, password: password }))

    } else {
      //authObs = this.authsrv.SignUp(email, password)
      this.store.dispatch(new fromAuthActions.SignUpStart({ email: email, password: password }))
    }

    // authObs.subscribe(
    //   response => {
    //     console.log(response)
    //     this.isloading = false
    //   },
    //   errormsg => {
    //     console.log(errormsg)
    //     this.error = errormsg
    //     this.isloading = false
    //   }
    // );
    form.reset()
  }

  switchLogin() {
    this.islogin = !this.islogin;
  }

  onhandleError() {
    //this.error = null
    this.store.dispatch(new fromAuthActions.ClearError())
  }

}
