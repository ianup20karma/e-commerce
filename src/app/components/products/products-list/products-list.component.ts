import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  loggedIn = false;
  isUserAdmin = false;
  productsData: any = [];
  constructor(private common: CommonService, private products: ProductsService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loggedIn = this.common.isLoggedIn();
    this.common.loggedUserData.subscribe((res: any) => this.isUserAdmin = res.admin);
    if (this.loggedIn) {
      this.http.get<any>('http://localhost:3000/products')
        .subscribe(
          (res) => this.productsData = res,
          () => alert('Something went wrong!')
        );
    }
  }

  createProduct() {
    this.router.navigate(['/products/create']);
  }

  action(actiontype: string, product: any) {
    this.products.setProductForCurrentAction(product);
    if (actiontype === 'edit') {
      this.router.navigate([`/products/edit/${product.id}`]);
    } else {
      this.products.deleteProduct(product);
    }
  }
}
