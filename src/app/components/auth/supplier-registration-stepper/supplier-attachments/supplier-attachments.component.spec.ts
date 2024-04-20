import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierAttachmentsComponent } from './supplier-attachments.component';

describe('SupplierAttachmentsComponent', () => {
  let component: SupplierAttachmentsComponent;
  let fixture: ComponentFixture<SupplierAttachmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupplierAttachmentsComponent]
    });
    fixture = TestBed.createComponent(SupplierAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
