import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordSelectorComponent } from './tag-selector.component';

describe('TagSelectorComponent', () => {
  let component: KeywordSelectorComponent;
  let fixture: ComponentFixture<KeywordSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeywordSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeywordSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
