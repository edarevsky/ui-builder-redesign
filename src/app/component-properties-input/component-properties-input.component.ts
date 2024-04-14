import {Component, Input} from '@angular/core';
import {
  DialogService,
  FormControlComponent,
  FormHeaderComponent,
  FormItemComponent,
  FormLabelComponent,
  ListIconDirective,
  ListSecondaryDirective,
  ListTitleDirective,
  ObjectMarkerComponent,
  OptionComponent, PanelComponent, PanelContentDirective, PanelTitleDirective,
  SelectComponent
} from '@fundamental-ngx/core';
import {
  ComponentValidationSettingsComponent
} from '../component-validation-settings/component-validation-settings.component';
import {FlowDataService} from '../services/flow-data.service';
import {ValidationDesignerComponent} from '../validation-designer/validation-designer.component';
import {cloneDeep} from 'lodash';
import {IVariableField} from '../variable-designer/variable-designer.component';
import {CommonModule} from '@angular/common';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-component-properties-input',
  standalone: true,
  imports: [
    SelectComponent,
    FormControlComponent,
    FormLabelComponent,
    FormHeaderComponent,
    FormItemComponent,
    OptionComponent,
    ComponentValidationSettingsComponent,
    CommonModule,
    ListTitleDirective,
    ListSecondaryDirective,
    ObjectMarkerComponent,
    ListIconDirective,
    PanelComponent,
    PanelTitleDirective,
    PanelContentDirective
  ],
  templateUrl: './component-properties-input.component.html',
  styleUrl: './component-properties-input.component.scss'
})
export class ComponentPropertiesInputComponent {
  @Input() componentId: any;
  // @ts-ignore
  @Input() stepId: string;

  panelState$ = new BehaviorSubject({
    data: {
      isOpen: true
    },
    appearance: {
      isOpen: true
    },
    validations: {
      isOpen: false
    }
  })

  constructor(private flowDataService: FlowDataService, private dialogService: DialogService) {
  }

  public get component() {
    return this.screenDefinition?.components?.find((component: any) => component.id === this.componentId);
  }

  get screenNode() {
    return this.flowDataService.getFlow()?.nodes.find((node: any) => node.id === this.stepId);
  }

  get screenDefinition() {
    return this.screenNode?.screenDefinition || { components: [] };
  }

  public updatePanelState(panelName: 'data' | 'appearance' | 'validations', isOpen: boolean) {
    debugger
    this.panelState$.next({
      ...this.panelState$.getValue(),
      [panelName]: {
        isOpen
      }
    });
  }

  public addNewValidation(componentId: any) {
    const dialogRef = this.dialogService.open(ValidationDesignerComponent, {});
    dialogRef.afterClosed.subscribe((result) => {
      if (result['validation'] && this.stepId) {
        this.flowDataService.addValidationToComponent(this.stepId, componentId, result['validation']);
      }
    });
  }

  public addExistingValidation(componentId: string, validation: any) {
    this.flowDataService.addValidationToComponent(this.stepId, componentId, validation);
  }

  public validationExistsForComponent(validationName: string) : boolean {
    return this.component.validations?.find((validation: any) => validation.name === validationName);
  }

  public get availableValidations(): any[] {
    return this.flowDataService.getFlow()?.availableValidations || [];
  }

  public get variables() {
    return this.flowDataService.getInputVariablesForStep(this.stepId) || [];
  }

  get outputVariableFields() {
    return this.screenNode?.outputVariableFields;
  }

  public updatePrepopulateVariable(componentId: string, event: Event) {
    const screenDefinition = cloneDeep(this.screenDefinition);
    const component = screenDefinition.components.find((component: any) => component.id === componentId);

    // @ts-ignore
    if (!component.prepopulate) {
      component.prepopulate = {};
    }

    component.prepopulate.variableName = event;
    this.updateScreen(screenDefinition);
  }

  public updatePrepopulateField(componentId: string, event: Event) {
    const screenDefinition = cloneDeep(this.screenDefinition);
    const component = screenDefinition.components.find((component: any) => component.id === componentId);

    // @ts-ignore
    if (!component.prepopulate) {
      component.prepopulate = {};
    }

    component.prepopulate.fieldName = event;

    this.updateScreen(screenDefinition);
  }

  public updateValidationTrigger(componentId: string, validationTrigger: string) {
    const screenDefinition = cloneDeep(this.screenDefinition);
    const component = screenDefinition.components.find((component: any) => component.id === componentId);
    component.validationTrigger = validationTrigger;

    this.updateScreen(screenDefinition);
  }

  public getVariableFields(variableName: string): IVariableField[] {
    return this.variables?.find((variable: any) => variable.name === variableName)?.fields || [];
  }

  updateScreen(screenDefinition: any) {
    const definition = {...this.flowDataService.getFlow()};
    const node = definition?.nodes.find((node: any) => node.id === this.stepId);
    node.screenDefinition = screenDefinition;
    node.outputVariableFields = this.getOutputVariableFields(screenDefinition);
    this.flowDataService.updateFlow(definition);
  }

  public getOutputVariableFields(screenDefinition: any): IVariableField[] {
    const fields: IVariableField[] = [];

    screenDefinition.components.forEach((component: any) => {
      if (component.mappedField) {
        fields.push({
          name: component.mappedField,
          type: 'string' // TODO: change later
        });
      }
    });

    return fields;
  }
  updatePropertySelect(componentId: string, propertyName: string, value: string) {
    const screenDefinition = cloneDeep(this.screenDefinition);
    const component = screenDefinition.components.find((component: any) => component.id === componentId);
    // @ts-ignore
    component[propertyName] = value;

    this.updateScreen(screenDefinition);
  }

  updateProperty(componentId: string, propertyName: string, event: Event) {
    const screenDefinition = cloneDeep(this.screenDefinition);
    const component = screenDefinition.components.find((component: any) => component.id === componentId);
    // @ts-ignore
    component[propertyName] = event?.target?.['value'];

    this.updateScreen(screenDefinition);
  }

  public updateMappedField(componentId: string, event: Event) {
    const screenDefinition = cloneDeep(this.screenDefinition);
    const component = screenDefinition.components.find((component: any) => component.id === componentId);
    // @ts-ignore
    component.mappedField = event?.target?.['value'];
    this.updateScreen(screenDefinition);
  }
}
