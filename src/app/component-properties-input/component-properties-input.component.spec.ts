import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentPropertiesInputComponent } from './component-properties-input.component';

describe('ComponentPropertiesInputComponent', () => {
  let component: ComponentPropertiesInputComponent;
  let fixture: ComponentFixture<ComponentPropertiesInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentPropertiesInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponentPropertiesInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
