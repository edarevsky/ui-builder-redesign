import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationStepAddValidationComponent } from './validation-step-add-validation.component';

describe('ValidationStepAddValidationComponent', () => {
  let component: ValidationStepAddValidationComponent;
  let fixture: ComponentFixture<ValidationStepAddValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationStepAddValidationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidationStepAddValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
