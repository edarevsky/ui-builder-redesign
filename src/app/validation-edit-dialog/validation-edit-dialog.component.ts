import {Component} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {
  ButtonComponent, ContentDensityDirective,
  DialogBodyComponent,
  DialogComponent,
  DialogFooterComponent,
  DialogHeaderComponent,
  DialogRef,
  FormControlComponent,
  FormInputMessageGroupComponent,
  FormItemComponent,
  FormLabelComponent,
  FormMessageComponent
} from '@fundamental-ngx/core';
import {FlowDataService} from '../services/flow-data.service';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-validation-edit-dialog',
  standalone: true,
  imports: [
    ButtonComponent,
    DialogBodyComponent,
    DialogComponent,
    DialogFooterComponent,
    DialogHeaderComponent,
    FormControlComponent,
    FormInputMessageGroupComponent,
    FormItemComponent,
    FormLabelComponent,
    FormMessageComponent,
    NgIf,
    ReactiveFormsModule,
    ContentDensityDirective
  ],
  templateUrl: './validation-edit-dialog.component.html',
  styleUrl: './validation-edit-dialog.component.scss'
})
export class ValidationEditDialogComponent {
  public readonly validationForm;

  constructor(public dialogRef: DialogRef, private flowDataService: FlowDataService) {
    this.validationForm = new FormGroup({
      name: new FormControl({value: dialogRef.data['validation'].name, disabled: true}),
      data: new FormControl(dialogRef.data['validation'].data, Validators.required),
      type: new FormControl(dialogRef.data['validation'].type)
    });
  }

  public get availableValidations(): any {
    return this.flowDataService.getFlow()?.availableValidations;
  }

  public nameValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const name = control.value;
    if (!name) {
      return null;
    }
    const nameExists = this.availableValidations?.find((validation: any) => validation.name === name);

    return nameExists ? {nameExists} : null;
  }

  save() {
    this.dialogRef.close({
      validation: this.validationForm.getRawValue()
    });
  }

  cancel() {
    this.dialogRef.close('cancel');
  }
}
