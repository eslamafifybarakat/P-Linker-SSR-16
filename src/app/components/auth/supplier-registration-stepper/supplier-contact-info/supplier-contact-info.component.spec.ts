import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierContactInfoComponent } from './supplier-contact-info.component';

describe('SupplierContactInfoComponent', () => {
  let component: SupplierContactInfoComponent;
  let fixture: ComponentFixture<SupplierContactInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierContactInfoComponent]
    });
    fixture = TestBed.createComponent(SupplierContactInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
