import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSubreaditComponent } from './new-subreadit.component';

describe('NewSubreaditComponent', () => {
  let component: NewSubreaditComponent;
  let fixture: ComponentFixture<NewSubreaditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewSubreaditComponent]
    });
    fixture = TestBed.createComponent(NewSubreaditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
