import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollTopComponent } from './scroll-top.component';

describe('ScrollTopComponent', () => {
  let component: ScrollTopComponent;
  let fixture: ComponentFixture<ScrollTopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ScrollTopComponent]
    });
    fixture = TestBed.createComponent(ScrollTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
