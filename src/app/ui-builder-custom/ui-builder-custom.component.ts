import {ChangeDetectorRef, Component, Input
} from '@angular/core';
import {
  DndDraggableDirective,
  DndDragImageRefDirective,
  DndDropEvent,
  DndDropzoneDirective,
  DndPlaceholderRefDirective
} from 'ngx-drag-drop';
import {CommonModule} from '@angular/common';
import {EffectAllowed} from 'ngx-drag-drop/lib/dnd-types';
import {IconComponent} from '@fundamental-ngx/core/icon';
import {v4 as uuid} from 'uuid';
import {
  ButtonComponent,
  ContentDensityDirective,
  DialogService, DialogTitleDirective,
  FormControlComponent,
  FormHeaderComponent,
  FormItemComponent,
  FormLabelComponent,
  ListComponent,
  ListIconDirective,
  ListItemComponent, ListSecondaryDirective,
  ListTitleDirective, ObjectMarkerComponent,
  OptionComponent,
  PanelComponent,
  PopoverBodyComponent,
  PopoverComponent,
  PopoverControlComponent,
  PopoverTriggerDirective,
  SelectComponent, TitleComponent
} from '@fundamental-ngx/core';
import {BehaviorSubject} from 'rxjs';
import {IVariableField} from '../variable-designer/variable-designer.component';
import {FlowDataService} from '../services/flow-data.service';
import {cloneDeep} from 'lodash';
import {
  ComponentValidationSettingsComponent
} from '../component-validation-settings/component-validation-settings.component';
import {ComponentPropertiesInputComponent} from '../component-properties-input/component-properties-input.component';
import {ComponentPropertiesButtonComponent} from '../component-properties-button/component-properties-button.component';
import {ComponentPropertiesTextComponent} from '../component-properties-text/component-properties-text.component';

const componentList = [
  {
    name: 'Input',
    type: 'input',
    iconName: 'ui-notifications',
    label: 'Label',
    placeholder: 'Placeholder',
    mappedField: null,
    inputType: 'text'
  },
  {
    name: 'Header',
    type: 'header',
    iconName: 'text',
    label: 'Header Text'
  }, {
    name: 'Button',
    type: 'button',
    iconName: 'cursor',
    label: 'Button Text',
    clickAction: 'continueFlow'
  }];

@Component({
  selector: 'app-ui-builder-custom',
  standalone: true,
  imports: [
    CommonModule,
    DndDropzoneDirective,
    DndDraggableDirective,
    DndDragImageRefDirective,
    DndPlaceholderRefDirective,
    ListComponent,
    ContentDensityDirective,
    ListItemComponent,
    ListTitleDirective,
    ListIconDirective,
    IconComponent,
    PanelComponent,
    PopoverComponent,
    PopoverTriggerDirective,
    PopoverBodyComponent,
    PopoverControlComponent,
    FormHeaderComponent,
    FormItemComponent,
    FormLabelComponent,
    FormControlComponent,
    OptionComponent,
    SelectComponent,
    ButtonComponent,
    TitleComponent,
    DialogTitleDirective,
    ComponentValidationSettingsComponent,
    ListSecondaryDirective,
    ObjectMarkerComponent,
    ComponentPropertiesInputComponent,
    ComponentPropertiesButtonComponent,
    ComponentPropertiesTextComponent
  ],
  templateUrl: './ui-builder-custom.component.html',
  styleUrl: './ui-builder-custom.component.scss'
})
export class UiBuilderCustomComponent {
  componentList = componentList;
  // @ts-ignore
  @Input() stepId: string;
  selectedComponentId$: BehaviorSubject<string> = new BehaviorSubject<string>('');


  public get selectedComponent() {
    return this.screenDefinition?.components?.find((component: any) => component.id === this.selectedComponentId$.getValue());
  }

  public get variables() {
    return this.flowDataService.getInputVariablesForStep(this.stepId) || [];
  }

  get screenNode() {
    return this.flowDataService.getFlow()?.nodes.find((node: any) => node.id === this.stepId);
  }

  get screenDefinition() {
    return this.screenNode?.screenDefinition || { components: [] };
  }

  get outputVariableFields() {
    return this.screenNode?.outputVariableFields;
  }

  constructor(
    private dialogService: DialogService,
    private cdr: ChangeDetectorRef,
    private flowDataService: FlowDataService
  ) {}

  draggable = {
    // note that data is handled with JSON.stringify/JSON.parse
    // only set simple data or POJO's as methods will be lost
    data: 'myDragData',
    effectAllowed: 'all' as EffectAllowed,
    disable: false,
    handle: false
  };

  onDragStart(event: DragEvent) {}

  onDragEnd(event: DragEvent) {}

  onDraggableCopied(event: DragEvent) { }

  onDraggableLinked(event: DragEvent) {}

  onDraggableMoved(event: DragEvent) {}

  onDragCanceled(event: DragEvent) {}

  onDragover(event: DragEvent) {}

  onDrop(event: DndDropEvent) {
    console.log('dropped', JSON.stringify(event, null, 2));

    if (!this.screenDefinition?.components) {
      return;
    }

    const screenDefinition = cloneDeep(this.screenDefinition);
    let selectedComponentId;

    if (event.dropEffect === 'copy') {
      const id = uuid();
      if (typeof (event.index) !== 'undefined') {
        screenDefinition.components.splice(event.index, 0, {
          id,
          label: event.data.label,
          placeholder: event.data.placeholder,
          type: event.data.type,
          clickAction: event.data.clickAction,
          mappedField: event.data.mappedField,
          inputType: event.data.inputType
        });

        selectedComponentId = id;
      }
    } else if (event.dropEffect === 'move') {
      const prevIndex = screenDefinition.components.findIndex((component: any) => component.id === event.data.id);
      screenDefinition.components.splice(prevIndex, 1);
      if (typeof (event.index) !== 'undefined') {
        screenDefinition.components.splice(event.index, 0, event.data);
      }
      selectedComponentId = event.data.id;
    }
    this.updateScreen(screenDefinition);
    this.selectedComponentId$.next(selectedComponentId);
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

  public deleteComponent(index: number) {
    // @ts-ignore
    const screenDefinition = cloneDeep(this.screenDefinition);
    screenDefinition.components.splice(index, 1);
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

  updateScreen(screenDefinition: any) {
    const definition = {...this.flowDataService.getFlow()};
    const node = definition?.nodes.find((node: any) => node.id === this.stepId);
    node.screenDefinition = screenDefinition;
    node.outputVariableFields = this.getOutputVariableFields(screenDefinition);
    this.flowDataService.updateFlow(definition);
  }
}
