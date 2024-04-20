import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierCompaniesComponent } from './supplier-companies.component';

describe('SupplierCompaniesComponent', () => {
  let component: SupplierCompaniesComponent;
  let fixture: ComponentFixture<SupplierCompaniesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierCompaniesComponent]
    });
    fixture = TestBed.createComponent(SupplierCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
