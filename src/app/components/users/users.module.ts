import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersCreateEditWrapperComponent } from './users-create-edit-wrapper/users-create-edit-wrapper.component';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersCreateEditComponent } from './users-create-edit/users-create-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorDirective } from './color.directive';


@NgModule({
  declarations: [
    UsersCreateEditWrapperComponent,
    UsersListComponent,
    UsersCreateEditComponent,
    ColorDirective
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UsersModule { }
