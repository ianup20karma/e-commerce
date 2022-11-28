import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsCreateEditWrapperComponent } from './products-create-edit-wrapper.component';

describe('ProductsCreateEditWrapperComponent', () => {
  let component: ProductsCreateEditWrapperComponent;
  let fixture: ComponentFixture<ProductsCreateEditWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsCreateEditWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsCreateEditWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
