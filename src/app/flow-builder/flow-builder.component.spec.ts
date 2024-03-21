import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowBuilderComponent } from './flow-builder.component';

describe('FlowBuilderComponent', () => {
  let component: FlowBuilderComponent;
  let fixture: ComponentFixture<FlowBuilderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlowBuilderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlowBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
