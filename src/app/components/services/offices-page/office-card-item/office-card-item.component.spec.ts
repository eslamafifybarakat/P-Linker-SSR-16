import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeCardItemComponent } from './office-card-item.component';

describe('OfficeCardItemComponent', () => {
  let component: OfficeCardItemComponent;
  let fixture: ComponentFixture<OfficeCardItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [OfficeCardItemComponent]
    });
    fixture = TestBed.createComponent(OfficeCardItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
