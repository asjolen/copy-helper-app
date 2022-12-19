import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HandleObjectModalComponent } from './create-object-modal.component';

describe('CreateObjectModalComponent', () => {
  let component: HandleObjectModalComponent;
  let fixture: ComponentFixture<HandleObjectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandleObjectModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandleObjectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
