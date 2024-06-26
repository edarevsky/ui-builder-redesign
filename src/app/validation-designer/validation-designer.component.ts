import {Component} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf, NgStyle} from '@angular/common';
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
  FormControlComponent,
  FormItemComponent,
  FormLabelComponent,
  OptionComponent,
  ScrollbarDirective,
  SelectComponent,
  TitleComponent
} from '@fundamental-ngx/core';
import {VALIDATION_TYPES} from '../const/validationTypes';
import {BehaviorSubject} from 'rxjs';
import {CdkScrollable} from '@angular/cdk/overlay';
import {DialogModule} from '@angular/cdk/dialog';

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
    DialogTitleDirective
  ],
  templateUrl: './validation-designer.component.html',
  styleUrl: './validation-designer.component.scss'
})
export class ValidationDesignerComponent {
  validationTypes = VALIDATION_TYPES;
  validation$: BehaviorSubject<any> = new BehaviorSubject<any>({name: '', rules: {}});

  constructor(public dialogRef: DialogRef) {
  }

  changeName($event: Event) {
    this.validation$.next({...this.validation$.getValue() , name: ($event.target as HTMLInputElement)?.value});
  }

  changeTextRule(ruleName: string, $event: Event) {
    const rules = {...this.validation$.getValue().rules};
    // @ts-ignore
    if ($event.target?.['value'] === '') {
      // @ts-ignore
      rules[ruleName] = $event.target?.['value'];
    } else {
      delete rules[ruleName];
    }

    this.validation$.next({...this.validation$.getValue(), rules});
  }

  save() {
    this.dialogRef.close({
      validation: this.validation$.getValue()
    });
  }

  cancel() {
    this.dialogRef.close('cancel');
  }
}
