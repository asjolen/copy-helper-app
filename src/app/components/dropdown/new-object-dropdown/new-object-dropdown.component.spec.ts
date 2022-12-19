import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewObjectDropdownComponent } from './new-object-dropdown.component';

describe('NewObjectDropdownComponent', () => {
  let component: NewObjectDropdownComponent;
  let fixture: ComponentFixture<NewObjectDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewObjectDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewObjectDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
