import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariableDesignerComponent } from './variable-designer.component';

describe('VariableDesignerComponent', () => {
  let component: VariableDesignerComponent;
  let fixture: ComponentFixture<VariableDesignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariableDesignerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VariableDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
