import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepResultVariableComponent } from './step-result-variable.component';

describe('StepResultVariableComponent', () => {
  let component: StepResultVariableComponent;
  let fixture: ComponentFixture<StepResultVariableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepResultVariableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StepResultVariableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
