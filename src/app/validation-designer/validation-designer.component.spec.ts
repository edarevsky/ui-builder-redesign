import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationDesignerComponent } from './validation-designer.component';

describe('ValidationDesignerComponent', () => {
  let component: ValidationDesignerComponent;
  let fixture: ComponentFixture<ValidationDesignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationDesignerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidationDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
