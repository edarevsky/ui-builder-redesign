import {Component, Input} from '@angular/core';
import {
  ButtonComponent,
  FormControlComponent,
  FormItemComponent,
  FormLabelComponent,
  OptionComponent,
  SelectComponent
} from '@fundamental-ngx/core';
import {FlowDataService} from '../services/flow-data.service';
import {JsonPipe, KeyValuePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-component-validation-settings',
  standalone: true,
  imports: [
    FormItemComponent,
    FormLabelComponent,
    FormControlComponent,
    SelectComponent,
    OptionComponent,
    NgForOf,
    JsonPipe,
    KeyValuePipe,
    NgIf,
    ButtonComponent
  ],
  templateUrl: './component-validation-settings.component.html',
  styleUrl: './component-validation-settings.component.scss'
})
export class ComponentValidationSettingsComponent {
  // @ts-ignore
  @Input() validationName: string;
  // @ts-ignore
  @Input() stepId: string;
  // @ts-ignore
  @Input() componentId: string | null;

  constructor(private flowDataService: FlowDataService) {
  }

  public getFlow() {
    return this.flowDataService.getFlow();
  }

  get screenDefinition() {
    return this.getFlow()?.nodes.find((node: any) => node.id === this.stepId)?.screenDefinition;
  }

  public get component() {
    return this.screenDefinition?.components?.find((component: any) => component.id === this.componentId);
  }

  public removeValidation(validationName: string) {
    if (!this.componentId) return;
    this.flowDataService.removeValidationFromComponent(this.stepId, this.componentId, validationName)
  }

 /* public get validationRules(): {[key: string]: string} {
    if (!this.validationName) return {};

    debugger

    return this.getFlow()?.availableValidations?.find((validation: any) => validation.name === this.validationName)?.rules
  }

  public get validationDisplaySettings() {
    debugger
    return this.component.validations?.find((validation: any) => validation.name === this.validationName)
  }*/
}
