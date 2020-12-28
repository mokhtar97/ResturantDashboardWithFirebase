import { NgModule } from '@angular/core';


import { RouterModule } from '@angular/router';
import { EditItemComponent } from './edit-item/edit-item.component';
import { ShoppingListComponent } from './shopping-list.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';




@NgModule({
    declarations: [
        ShoppingListComponent,
        EditItemComponent,
    ],
    imports: [
        FormsModule,
        RouterModule.forChild([
            {path:'',component:ShoppingListComponent},
        ]),
        SharedModule
    ],
})
export class ShoppingModule { }
