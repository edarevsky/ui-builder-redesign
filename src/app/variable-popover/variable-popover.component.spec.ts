import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VariablePopoverComponent } from './variable-popover.component';

describe('VariablePopoverComponent', () => {
  let component: VariablePopoverComponent;
  let fixture: ComponentFixture<VariablePopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VariablePopoverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VariablePopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
