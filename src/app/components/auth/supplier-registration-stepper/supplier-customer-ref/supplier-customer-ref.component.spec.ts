import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierCustomerRefComponent } from './supplier-customer-ref.component';

describe('SupplierCustomerRefComponent', () => {
  let component: SupplierCustomerRefComponent;
  let fixture: ComponentFixture<SupplierCustomerRefComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierCustomerRefComponent]
    });
    fixture = TestBed.createComponent(SupplierCustomerRefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
