import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { DropDowinList } from './dropdwon.directive';



@NgModule({
    declarations: [
      AlertComponent,
      LoadingSpinnerComponent,
      DropDowinList
       
    ],
    imports: [
        CommonModule,
    ],
    exports:[
        CommonModule,
        AlertComponent,
        LoadingSpinnerComponent,
        DropDowinList
    ],
    entryComponents:[AlertComponent]
    
})
export class SharedModule { }
