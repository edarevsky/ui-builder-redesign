import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentValidationSettingsComponent } from './component-validation-settings.component';

describe('ComponentValidationSettingsComponent', () => {
  let component: ComponentValidationSettingsComponent;
  let fixture: ComponentFixture<ComponentValidationSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentValidationSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponentValidationSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
