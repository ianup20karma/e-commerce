import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsCreateEditWrapperComponent } from './products-create-edit-wrapper/products-create-edit-wrapper.component';
import { ProductsCreateEditComponent } from './products-create-edit/products-create-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorDirective } from './color.directive';
import { BgColorDirective } from './bgcolor.directive';


@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsCreateEditWrapperComponent,
    ProductsCreateEditComponent,
    ColorDirective,
    BgColorDirective
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }
