import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactUsSectionComponent } from './contact-us-section.component';

describe('ContactUsSectionComponent', () => {
  let component: ContactUsSectionComponent;
  let fixture: ComponentFixture<ContactUsSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactUsSectionComponent]
    });
    fixture = TestBed.createComponent(ContactUsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
