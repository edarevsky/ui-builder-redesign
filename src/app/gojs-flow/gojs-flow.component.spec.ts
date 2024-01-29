import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GojsFlowComponent } from './gojs-flow.component';

describe('FlowComponent', () => {
  let component: GojsFlowComponent;
  let fixture: ComponentFixture<GojsFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GojsFlowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GojsFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
