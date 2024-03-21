import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiBuilderCustomComponent } from './ui-builder-custom.component';

describe('UiBuilderCustomComponent', () => {
  let component: UiBuilderCustomComponent;
  let fixture: ComponentFixture<UiBuilderCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiBuilderCustomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiBuilderCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
