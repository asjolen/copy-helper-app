import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectNavigationComponent } from './object-navigation.component';

describe('ObjectNavigationComponent', () => {
  let component: ObjectNavigationComponent;
  let fixture: ComponentFixture<ObjectNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectNavigationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
