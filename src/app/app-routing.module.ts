import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
   {
     path: 'Recipes', 
     loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule)
   },
   {
     path: 'shpping-list', 
     loadChildren: () => import('./shopping-list/shopping.module').then(m => m.ShoppingModule)
   },
   {
     path: 'auth', 
     loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
   },
   {path:'**',redirectTo:'/Recipes',pathMatch:'full'}
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
