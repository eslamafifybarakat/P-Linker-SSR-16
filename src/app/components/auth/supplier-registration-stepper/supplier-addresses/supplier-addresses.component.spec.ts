import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierAddressesComponent } from './supplier-addresses.component';

describe('SupplierAddressesComponent', () => {
  let component: SupplierAddressesComponent;
  let fixture: ComponentFixture<SupplierAddressesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierAddressesComponent]
    });
    fixture = TestBed.createComponent(SupplierAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
