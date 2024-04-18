import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierRegistrationStepperComponent } from './supplier-registration-stepper.component';

describe('SupplierRegistrationStepperComponent', () => {
  let component: SupplierRegistrationStepperComponent;
  let fixture: ComponentFixture<SupplierRegistrationStepperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierRegistrationStepperComponent]
    });
    fixture = TestBed.createComponent(SupplierRegistrationStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
