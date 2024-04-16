import {Component, Input} from '@angular/core';
import {FlowDataService} from '../services/flow-data.service';
import {
  ButtonComponent,
  DialogService,
  FormItemComponent,
  FormLabelComponent,
  ListGroupHeaderDirective,
  ListTitleDirective, OptionComponent, SelectComponent
} from '@fundamental-ngx/core';
import {NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {IVariable} from '../swd-flow/swd-flow.component';
import {ValidationEditDialogComponent} from '../validation-edit-dialog/validation-edit-dialog.component';

@Component({
  selector: 'app-validation-step-settings',
  standalone: true,
  imports: [
    FormItemComponent,
    FormLabelComponent,
    ListGroupHeaderDirective,
    ListTitleDirective,
    NgForOf,
    NgIf,
    OptionComponent,
    SelectComponent,
    TitleCasePipe,
    ButtonComponent
  ],
  templateUrl: './validation-step-settings.component.html',
  styleUrl: './validation-step-settings.component.scss'
})
export class ValidationStepSettingsComponent {
  @Input() stepId: any;

  constructor(private flowDataService: FlowDataService, private dialogService: DialogService) {
  }

  get variables() {
    return this.flowDataService.getCurrentVariables() || [];
  }

  public parseValue(value: string) {
    if (!value) {
      return null;
    }
    debugger
    const [variableName, fieldName] = value.split('.');
    return {
      variable: this.getVariableByName(variableName),
      fieldName
    };

  }

  public getVariableByName(variableName: string) {
    return this.variables.find((variable: IVariable) => variable.name === variableName);
  }

  public editValidation() {
    const dialogRef = this.dialogService.open(ValidationEditDialogComponent, {
      data: {
        validation: {...this.flowValidation}
      }
    })

    dialogRef.afterClosed.subscribe((result) => {
      if (!this.componentId) {
        return;
      }

      if (result['validation'] && this.stepId) {
        this.flowDataService.editValidation(this.stepId, this.componentId, result['validation']);
      }
    });
  }

}
