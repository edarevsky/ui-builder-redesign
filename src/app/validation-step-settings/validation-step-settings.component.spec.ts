import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationStepSettingsComponent } from './validation-step-settings.component';

describe('ValidationStepSettingsComponent', () => {
  let component: ValidationStepSettingsComponent;
  let fixture: ComponentFixture<ValidationStepSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationStepSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidationStepSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
