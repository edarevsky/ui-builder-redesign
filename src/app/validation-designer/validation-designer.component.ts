import {Component} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {
  ButtonBarComponent,
  ButtonComponent,
  CheckboxComponent,
  ContentDensityDirective,
  DialogBodyComponent,
  DialogComponent,
  DialogFooterComponent,
  DialogHeaderComponent,
  DialogRef, DialogTitleDirective,
  FormControlComponent, FormInputMessageGroupComponent,
  FormItemComponent,
  FormLabelComponent, FormMessageComponent,
  OptionComponent,
  ScrollbarDirective,
  SelectComponent
} from '@fundamental-ngx/core';
import {BehaviorSubject} from 'rxjs';
import {CdkScrollable} from '@angular/cdk/overlay';
import {DialogModule} from '@angular/cdk/dialog';
import {AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FlowDataService} from '../services/flow-data.service';

@Component({
  selector: 'app-validation-designer',
  standalone: true,
  imports: [
    NgForOf,
    OptionComponent,
    SelectComponent,
    FormItemComponent,
    FormLabelComponent,
    FormControlComponent,
    AsyncPipe,
    NgIf,
    CheckboxComponent,
    DialogModule,
    DialogBodyComponent,
    DialogHeaderComponent,
    CdkScrollable,
    ScrollbarDirective,
    DialogComponent,
    ButtonBarComponent,
    ButtonComponent,
    DialogFooterComponent,
    ContentDensityDirective,
    DialogTitleDirective,
    FormsModule,
    ReactiveFormsModule,
    FormInputMessageGroupComponent,
    FormMessageComponent
  ],
  templateUrl: './validation-designer.component.html',
  styleUrl: './validation-designer.component.scss'
})

export class ValidationDesignerComponent {
  public validationForm = new FormGroup({
    name: new FormControl('', this.nameValidator.bind(this)),
    data: new FormControl(''),
    type: new FormControl('regex')
  });

  constructor(public dialogRef: DialogRef, private flowDataService: FlowDataService) {
  }

  public get availableValidations(): any {
      return this.flowDataService.getFlow()?.availableValidations;
  }


  public nameValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const name = control.value;
    if (!name) {
      return  null;
    }
    const nameExists = this.availableValidations?.find((validation: any) => validation.name === name);

    return nameExists ? {nameExists} : null;
  }

  /*changeTextRule(ruleType: string, $event: Event) {
    const rules = {...this.validation$.getValue().rules};
    // @ts-ignore
    if ($event.target?.['value'] !== '') {
      // @ts-ignore
      rules[ruleType] = $event.target?.['value'];
    } else {
      delete rules[ruleType];
    }

    this.validation$.next({...this.validation$.getValue(), rules});
  }

  changeBooleanRule(ruleType: string, enabled: boolean) {
    debugger
    const rules = {...this.validation$.getValue().rules};
    // @ts-ignore
    rules[ruleType] = enabled;

    this.validation$.next({...this.validation$.getValue(), rules});
  }*/

  save() {
    console.log(this.validationForm.getRawValue());
    this.dialogRef.close({
      validation: this.validationForm.getRawValue()
    });
  }

  cancel() {
    this.dialogRef.close('cancel');
  }
}
