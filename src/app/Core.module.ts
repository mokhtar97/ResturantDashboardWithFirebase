import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core'
import { AuthHttpInterceptor } from './auth/auth/aut-serviceinterceptor.service';

@NgModule({
 providers:[
   
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
 ]
})

export class CoreModule{}