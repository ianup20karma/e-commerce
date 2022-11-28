import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-products-create-edit',
  templateUrl: './products-create-edit.component.html',
  styleUrls: ['./products-create-edit.component.scss']
})
export class ProductsCreateEditComponent implements OnInit {

  @Input() form: FormGroup = new FormGroup({});
  @Input() isLoggedIn: boolean = false;
  @Input() isEdit: boolean = false;
  @Input() productData: any = {};
  @Output() submitEvent = new EventEmitter<any>();
  @Output() loginEvent = new EventEmitter<any>();

  ngOnInit() {
    if (this.isEdit) {
      this.form.patchValue({
        title: this.productData.title,
        price: this.productData.price,
        category: this.productData.category,
        description: this.productData.description,
        image: this.productData.image,
        rating: this.productData.rating
      });
    }
  }

  submit(form: FormGroup) {
    this.submitEvent.emit(form.value);
  }

  login() {
    this.submitEvent.emit(true);
  }
}
