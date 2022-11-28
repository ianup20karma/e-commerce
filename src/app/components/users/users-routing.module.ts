import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormGuard } from 'src/app/services/form.guard';
import { UsersCreateEditWrapperComponent } from './users-create-edit-wrapper/users-create-edit-wrapper.component';
import { UsersListComponent } from './users-list/users-list.component';

const routes: Routes = [
  {
    path: "",
    component: UsersListComponent
  },
  {
    path: "create",
    component: UsersCreateEditWrapperComponent,
    canDeactivate: [FormGuard]
  },
  {
    path: "edit/:id",
    component: UsersCreateEditWrapperComponent,
    canDeactivate: [FormGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
