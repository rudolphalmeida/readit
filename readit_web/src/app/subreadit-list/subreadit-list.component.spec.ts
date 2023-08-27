import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubreaditListComponent } from './subreadit-list.component';

describe('SubreaditListComponent', () => {
  let component: SubreaditListComponent;
  let fixture: ComponentFixture<SubreaditListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubreaditListComponent]
    });
    fixture = TestBed.createComponent(SubreaditListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
