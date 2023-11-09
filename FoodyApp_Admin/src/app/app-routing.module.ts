import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { PromotionComponent } from './promotion/promotion.component';
import { LoginComponent } from './category/login/login.component';
import { HomeComponent } from './home/home.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'promotion', component: PromotionComponent },
  { path: 'order', component: OrderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
