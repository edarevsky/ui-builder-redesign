import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentPropertiesTextComponent } from './component-properties-text.component';

describe('ComponentPropertiesTextComponent', () => {
  let component: ComponentPropertiesTextComponent;
  let fixture: ComponentFixture<ComponentPropertiesTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentPropertiesTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponentPropertiesTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
