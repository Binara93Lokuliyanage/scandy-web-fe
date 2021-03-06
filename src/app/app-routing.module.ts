import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAddComponent } from './product-add/product-add.component';

const routes: Routes = [
  {path: '', redirectTo: 'productList', pathMatch: 'full'},
  {path: 'productList', component: ProductListComponent},
  {path: 'add-product', component: ProductAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ProductListComponent, ProductAddComponent]
