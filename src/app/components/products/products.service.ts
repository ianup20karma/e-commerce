import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  productForCurrentAction: any = {};
  constructor(private http: HttpClient, private router: Router) { }

  setProductForCurrentAction(product: any) {
    this.productForCurrentAction = product;
  }

  updateProduct(product: any, productForm: FormGroup, loggedIn: boolean) {
    let newProduct = { ...product, id: this.productForCurrentAction.id };
    this.http.put<any>(`http://localhost:3000/products/${newProduct.id}`, newProduct)
      .subscribe({
        next: () => {
          alert('Product Data Updated Successfully!');
          alert('Please go to Products page to see it!');
          productForm.reset();
          this.router.navigate(['/products']);
        },
        error: () => {
          alert('Something went wrong!');
        }
      });
  }

  createProduct(user: any, productForm: FormGroup, loggedIn: boolean) {
    this.http.post<any>('http://localhost:3000/products/', user)
      .subscribe({
        next: () => {
          alert('Product Added Successfully!');
          alert('Please go to Products page to see it!');
          productForm.reset();
          this.router.navigate(['/products']);
        },
        error: () => {
          alert('Something went wrong!');
        }
      });
  }

  deleteProduct(product: any) {
    if (window.confirm('Do you really want to delete this product?')) {
      this.http.delete<any>(`http://localhost:3000/products/${product.id}`, product)
        .subscribe({
          next: () => {
            alert('Product Data deleted Successfully!');
            location.reload();
          },
          error: () => {
            alert('Something went wrong!');
          }
        });
    }
  }
}
