import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionVariableMappingComponent } from './action-variable-mapping.component';

describe('ActionVariableMappingComponent', () => {
  let component: ActionVariableMappingComponent;
  let fixture: ComponentFixture<ActionVariableMappingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionVariableMappingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActionVariableMappingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
