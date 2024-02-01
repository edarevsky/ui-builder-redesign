import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RunFlowComponent } from './run-flow.component';

describe('RunFlowComponent', () => {
  let component: RunFlowComponent;
  let fixture: ComponentFixture<RunFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RunFlowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RunFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
