import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { PromotionComponent } from './promotion/promotion.component';
import { LoginComponent } from './category/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'promotion', component: PromotionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
