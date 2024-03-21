import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwdFlowComponent } from './swd-flow.component';

describe('SwdFlowComponent', () => {
  let component: SwdFlowComponent;
  let fixture: ComponentFixture<SwdFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwdFlowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SwdFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
