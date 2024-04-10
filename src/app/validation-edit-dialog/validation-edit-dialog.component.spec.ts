import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationEditDialogComponent } from './validation-edit-dialog.component';

describe('ValidationEditDialogComponent', () => {
  let component: ValidationEditDialogComponent;
  let fixture: ComponentFixture<ValidationEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidationEditDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ValidationEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
