import {Component, Input} from '@angular/core';
import {
  DialogRef,
  DialogService,
  FormItemComponent,
  FormLabelComponent,
  ListGroupHeaderDirective, ListTitleDirective, OptionComponent, SelectComponent
} from '@fundamental-ngx/core';
import {FlowDataService} from '../services/flow-data.service';
import {Dialog} from '@angular/cdk/dialog';
import {NgForOf, NgIf, TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-validation-step-add-validation',
  standalone: true,
  imports: [
    Dialog,
    FormItemComponent,
    FormLabelComponent,
    ListGroupHeaderDirective,
    ListTitleDirective,
    NgForOf,
    NgIf,
    OptionComponent,
    SelectComponent,
    TitleCasePipe
  ],
  templateUrl: './validation-step-add-validation.component.html',
  styleUrl: './validation-step-add-validation.component.scss'
})
export class ValidationStepAddValidationComponent {
  @Input() stepId: any;

  constructor(private dialogRef: DialogRef, private flowDataService: FlowDataService) {
  }

  public addValidation() {
    this.dialogRef.close({

    })
  }

  public cancel() {
    this.dialogRef.close('cancel');
  }
}
