import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierBankInfoComponent } from './supplier-bank-info.component';

describe('SupplierBankInfoComponent', () => {
  let component: SupplierBankInfoComponent;
  let fixture: ComponentFixture<SupplierBankInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierBankInfoComponent]
    });
    fixture = TestBed.createComponent(SupplierBankInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
