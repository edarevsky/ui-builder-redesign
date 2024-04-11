import {Component, Input} from '@angular/core';
import {
  DialogService,
  FormControlComponent,
  FormHeaderComponent,
  FormItemComponent,
  FormLabelComponent,
  PanelComponent, PanelContentDirective, PanelTitleDirective
} from '@fundamental-ngx/core';
import {BehaviorSubject} from 'rxjs';
import {FlowDataService} from '../services/flow-data.service';
import {cloneDeep} from 'lodash';
import {IVariableField} from '../variable-designer/variable-designer.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-component-properties-text',
  standalone: true,
  imports: [
    FormHeaderComponent,
    FormItemComponent,
    FormLabelComponent,
    FormControlComponent,
    PanelComponent,
    AsyncPipe,
    PanelContentDirective,
    PanelTitleDirective
  ],
  templateUrl: './component-properties-text.component.html',
  styleUrl: './component-properties-text.component.scss'
})
export class ComponentPropertiesTextComponent {
  @Input() componentId: any;
  // @ts-ignore
  @Input() stepId: string;

  panelState$ = new BehaviorSubject({
    appearance: {
      isOpen: true
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

  public updatePanelState(panelName: 'appearance' | 'logic', isOpen: boolean) {
    debugger
    this.panelState$.next({
      ...this.panelState$.getValue(),
      [panelName]: {
        isOpen
      }
    });
  }

  // TODO: move to flow
  updateScreen(screenDefinition: any) {
    const definition = {...this.flowDataService.getFlow()};
    const node = definition?.nodes.find((node: any) => node.id === this.stepId);
    node.screenDefinition = screenDefinition;
    node.outputVariableFields = this.getOutputVariableFields(screenDefinition);
    this.flowDataService.updateFlow(definition);

  }

  updateProperty(componentId: string, propertyName: string, event: Event) {
    const screenDefinition = cloneDeep(this.screenDefinition);
    const component = screenDefinition.components.find((component: any) => component.id === componentId);
    // @ts-ignore
    component[propertyName] = event?.target?.['value'];

    this.updateScreen(screenDefinition);
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
}
