import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { CompCanDeactivate } from 'src/app/services/comp-can-deactivate';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-create-edit-wrapper',
  templateUrl: './products-create-edit-wrapper.component.html',
  styleUrls: ['./products-create-edit-wrapper.component.scss'],
})
export class ProductsCreateEditWrapperComponent implements OnInit, CompCanDeactivate {
  canDeactivate(): boolean {
    let formValueKeys = Object.keys(this.productForm.value);
    let patchValue: any = {};
    let patchingRequired = Object.keys(patchValue).length ? true : false;
    formValueKeys.forEach((key: any, index) => {
      if (!this.productForm.value[key]) {
        patchingRequired = true;
        patchValue[key] = index === formValueKeys.length - 1 ? { rate: '', count: '' } : '';
      };
    });
    if (patchingRequired) this.productForm.patchValue(patchValue);
    if (Object.keys(this.initialFormData).length === 0) this.initialFormData = this.productForm.value;
    console.log(this.common.isFormSame(this.initialFormData, this.productForm.value));
    
    return this.common.isFormSame(this.initialFormData, this.productForm.value);
  };

  loggedIn = false;
  productForm!: FormGroup;
  isEditFlow = false;
  idForEdit = 0;
  productToEdit = {};
  initialFormData: any = {
    title: '',
    price: '',
    category: '',
    description: '',
    image: '',
    rating: {
      rate: '',
      count: ''
    }
  };
  constructor(
    private products: ProductsService,
    private activateRoute: ActivatedRoute,
    private common: CommonService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loggedIn = this.common.isLoggedIn();
    if (this.activateRoute && this.activateRoute.url) {
      this.activateRoute.url.subscribe((url: any) => {
        if (url[0].path === 'edit') {
          this.isEditFlow = true;
          this.idForEdit = this.activateRoute.snapshot.params['id'];
          this.productToEdit = this.products.productForCurrentAction;
          this.initialFormData = this.productToEdit;
          delete this.initialFormData.id;
        }
      });
    }
    this.productForm = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      category: new FormControl(''),
      description: new FormControl(''),
      image: new FormControl(''),
      rating: this.formBuilder.group({
        rate: new FormControl(''),
        count: new FormControl(''),
      })
    });
  }

  onSubmit(formValue: any) {
    if (this.productForm.valid) {
      if (this.isEditFlow) {
        if (this.productForm.dirty) {
          this.products.updateProduct(formValue, this.productForm, this.loggedIn);
        } else {
          alert('Please update any field to update Product.');
        }
      } else {
        this.products.createProduct(formValue, this.productForm, this.loggedIn);
      }
    } else {
      alert('All fields are required! Please fill all fields!');
    }
  }

  loginRoute() {
    this.router.navigate(['/login']);
  }
}
