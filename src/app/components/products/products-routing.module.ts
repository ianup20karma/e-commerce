import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormGuard } from 'src/app/services/form.guard';
import { ProductsCreateEditWrapperComponent } from './products-create-edit-wrapper/products-create-edit-wrapper.component';
import { ProductsListComponent } from './products-list/products-list.component';

const routes: Routes = [
  {
    path: "",
    component: ProductsListComponent
  },
  {
    path: "create",
    component: ProductsCreateEditWrapperComponent,
    canDeactivate: [FormGuard]
  },
  {
    path: "edit/:id",
    component: ProductsCreateEditWrapperComponent,
    canDeactivate: [FormGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
