import {Component, EventEmitter, getDebugNode, Input, Output} from '@angular/core';
import {ActionRequestData} from '../const/actionFields';
import {CommonModule} from '@angular/common';
import {
  ButtonComponent, ContentDensityDirective, DialogService,
  FormControlComponent,
  FormItemComponent,
  FormLabelComponent, ListGroupHeaderDirective, ListTitleDirective,
  OptionComponent,
  SelectComponent
} from '@fundamental-ngx/core';
import {FlowDataService} from '../services/flow-data.service';
import {IVariable} from '../swd-flow/swd-flow.component';

@Component({
  selector: 'app-action-variable-mapping',
  standalone: true,
  imports: [CommonModule,
    FormControlComponent,
    FormItemComponent,
    FormLabelComponent,
    SelectComponent,
    OptionComponent,
    ButtonComponent,
    ContentDensityDirective,
    ListTitleDirective, ListGroupHeaderDirective],
  templateUrl: './action-variable-mapping.component.html',
  styleUrl: './action-variable-mapping.component.scss'
})
export class ActionVariableMappingComponent {
  // @ts-ignore
  @Input() actionType: string;
  @Input() stepId: any;

  constructor(private flowDataService: FlowDataService, private dialogService: DialogService) {
  }

  get expectedFields() {
    // @ts-ignore
    return ActionRequestData[this.actionType];
  }

  get variables() {
    return this.flowDataService.getInputVariablesForStep(this.stepId) || [];
  }

  get inputFields() {
    return this.flowDataService.getInputFields(this.stepId);
  }

  public getInputFieldData(fieldName: string) {
    const data = this.inputFields?.[fieldName];

    if (!data?.fieldName || !data?.variableName) {
      return null;
    }

    return `${data.variableName}.${data.fieldName}`;
  }

  public updateMappedField(inputField: any, optionValue: string) {
    const parsedValue= this.parseValue(optionValue);
    if (!parsedValue) {return}
    this.flowDataService.updateMappedField(this.stepId, inputField.name, parsedValue.variable?.name, parsedValue.fieldName);

  }

  public printSelected(selected: any) {
    debugger
    console.log(selected);
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
}
