import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { CompCanDeactivate } from 'src/app/services/comp-can-deactivate';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-users-create-edit-wrapper',
  templateUrl: './users-create-edit-wrapper.component.html',
  styleUrls: ['./users-create-edit-wrapper.component.scss']
})
export class UsersCreateEditWrapperComponent implements OnInit, CompCanDeactivate {
  canDeactivate(): boolean {
    let patchingRequired = false;
    let patchValue: any = {};
    Object.keys(this.signUpForm.value).forEach(key => {
      if (!this.signUpForm.value[key]) {
        patchingRequired = true;
        patchValue[key] = ''
      };
    });
    if (patchingRequired) this.signUpForm.patchValue(patchValue);
    if (Object.keys(this.initialFormData).length === 0) this.initialFormData = this.signUpForm.value;
    return this.common.isFormSame(this.initialFormData, this.signUpForm.value);
  };

  loggedIn = false;
  signUpForm!: FormGroup;
  isEditFlow = false;
  idForEdit = 0;
  userToEdit = {};
  initialFormData: any = { username: '', name: '', email: '', password: '' };
  constructor(private users: UsersService, private activateRoute: ActivatedRoute, private common: CommonService, private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.loggedIn = this.common.isLoggedIn();
    if (this.activateRoute && this.activateRoute.url) {
      this.activateRoute.url.subscribe((url: any) => {
        if (url[0].path === 'edit') {
          this.isEditFlow = true;
          this.idForEdit = this.activateRoute.snapshot.params['id'];
          this.userToEdit = this.users.userForCurrentAction;
          this.initialFormData = this.userToEdit;
          delete this.initialFormData.id;
          delete this.initialFormData.admin;
        }
      })
    }
    this.signUpForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });

    if (!this.isEditFlow) this.initialFormData = this.signUpForm.value;
  }

  onSubmit(formValue: any) {
    if (this.signUpForm.valid) {
      if (this.isEditFlow) {
        if (this.signUpForm.dirty) {
          this.users.updateUser(formValue, this.signUpForm, this.loggedIn);
        } else {
          alert('Please update any field to update user.')
        }
      } else {
        this.users.createUser(formValue, this.signUpForm, this.loggedIn);
      }
    } else {
      alert('All fields are required! Please fill all fields!')
    }
  }

  loginRoute() {
    this.router.navigate(['/login']);
  }
}
