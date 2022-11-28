import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersCreateEditWrapperComponent } from './users-create-edit-wrapper.component';

describe('UsersCreateEditWrapperComponent', () => {
  let component: UsersCreateEditWrapperComponent;
  let fixture: ComponentFixture<UsersCreateEditWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersCreateEditWrapperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersCreateEditWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
