import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentPropertiesButtonComponent } from './component-properties-button.component';

describe('ComponentPropertiesButtonComponent', () => {
  let component: ComponentPropertiesButtonComponent;
  let fixture: ComponentFixture<ComponentPropertiesButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentPropertiesButtonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComponentPropertiesButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
