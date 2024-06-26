import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
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
  ListItemComponent,
  ListTitleDirective,
  OptionComponent,
  PanelComponent,
  PopoverBodyComponent,
  PopoverComponent,
  PopoverControlComponent,
  PopoverTriggerDirective,
  SelectComponent, TitleComponent
} from '@fundamental-ngx/core';
import {BehaviorSubject} from 'rxjs';
import {IVariable} from '../swd-flow/swd-flow.component';
import {IVariableField} from '../variable-designer/variable-designer.component';
import {ValidationDesignerComponent} from '../validation-designer/validation-designer.component';

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
    DialogTitleDirective
  ],
  templateUrl: './ui-builder-custom.component.html',
  styleUrl: './ui-builder-custom.component.scss'
})
export class UiBuilderCustomComponent {
  @Input() screenJson: {
    components: Array<any>
  } | null = null;
  @Input() stepId: string | null = null;
  @Input() variables: IVariable[] | null = [];
  @Output() screenUpdated = new EventEmitter<{ stepId: string, screenData?: any, outputVariableFields?: IVariableField[] }>();

  schema$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  profileSchema$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  selectedComponent$: BehaviorSubject<any> = new BehaviorSubject<any>(null);


  constructor(
    private dialogService: DialogService,
    private cdr: ChangeDetectorRef
  ) {}

  getComponent(id: string) {
    return this.screenJson?.components.find(component => component.id === id);
  }

  componentList = [
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

  ngOnInit() {
    if (!this.screenJson) {
      this.screenJson = {
        components: []
      };
    }
  }

  draggable = {
    // note that data is handled with JSON.stringify/JSON.parse
    // only set simple data or POJO's as methods will be lost
    data: 'myDragData',
    effectAllowed: 'all' as EffectAllowed,
    disable: false,
    handle: false
  };

  onDragStart(event: DragEvent) {

    console.log('drag started', JSON.stringify(event, null, 2));
  }

  onDragEnd(event: DragEvent) {

    console.log('drag ended', JSON.stringify(event, null, 2));
  }

  onDraggableCopied(event: DragEvent) {

    console.log('draggable copied', JSON.stringify(event, null, 2));
  }

  onDraggableLinked(event: DragEvent) {

    console.log('draggable linked', JSON.stringify(event, null, 2));
  }

  onDraggableMoved(event: DragEvent) {

    console.log('draggable moved', JSON.stringify(event, null, 2));
  }

  onDragCanceled(event: DragEvent) {

    console.log('drag cancelled', JSON.stringify(event, null, 2));
  }

  onDragover(event: DragEvent) {
    console.log('dragover', JSON.stringify(event, null, 2));
  }

  onDrop(event: DndDropEvent) {
    if (!this.screenJson?.components) {
      return;
    }

    if (event.dropEffect === 'copy') {
      const id = uuid();
      if (typeof (event.index) !== 'undefined') {
        this.screenJson.components.splice(event.index, 0, {
          id,
          label: event.data.label,
          placeholder: event.data.placeholder,
          type: event.data.type,
          clickAction: event.data.clickAction,
          mappedField: event.data.mappedField,
          inputType: event.data.inputType
        });

        this.selectedComponent$.next(this.getComponent(id));
      }
    } else if (event.dropEffect === 'move') {
      const prevIndex = this.screenJson.components.findIndex(component => component.id === event.data.id);
      this.screenJson.components.splice(prevIndex, 1);
      if (typeof (event.index) !== 'undefined') {
        this.screenJson.components.splice(event.index, 0, event.data);
      }
      this.selectedComponent$.next(this.getComponent(event.data.id));
    }

    this.screenUpdatedEmit();

    console.log('dropped', JSON.stringify(event, null, 2));
  }

  updatePropertySelect(componentId: string, propertyName: string, value: string) {
    if (!this.screenJson?.components) {
      return;
    }

    const component = this.screenJson.components.find(component => component.id === componentId);
    // @ts-ignore
    component[propertyName] = value;

    this.screenUpdatedEmit();
  }

  updateProperty(componentId: string, propertyName: string, event: Event) {
    if (!this.screenJson?.components) {
      return;
    }

    const component = this.screenJson.components.find(component => component.id === componentId);
    // @ts-ignore
    component[propertyName] = event?.target?.['value'];

    this.screenUpdatedEmit();
  }

  private screenUpdatedEmit() {
    if (this.stepId && this.screenJson) {
      this.screenUpdated.emit({
        stepId: this.stepId,
        screenData: this.screenJson
      });
    }
  }

  public deleteComponent(index: number) {
    // @ts-ignore
    this.screenJson.components.splice(index, 1);
    this.screenUpdatedEmit();
  }

  public updateMappedField(componentId: string, event: Event) {
    if (!this.screenJson?.components) {
      return;
    }

    const component = this.screenJson.components.find(component => component.id === componentId);

    // @ts-ignore
    component.mappedField = event?.target?.['value'];

    if (this.stepId && this.screenJson) {
      this.screenUpdated.emit({
        stepId: this.stepId,
        screenData: this.screenJson,
        outputVariableFields: this.getOutputVariableFields()
      });
    }
  }

  public getOutputVariableFields(): IVariableField[] {
    if (!this.screenJson?.components) {
      return [];
    }

    const fields: IVariableField[] = [];

    this.screenJson.components.forEach(component => {
      if (component.mappedField) {
        fields.push({
          name: component.mappedField,
          type: 'string' // TODO: change later
        });
      }
    });

    return fields;
  }

  public updatePrepopulateVariable(componentId: string, event: Event) {
    if (!this.screenJson?.components) {
      return;
    }

    const component = this.screenJson.components.find(component => component.id === componentId);

    // @ts-ignore
    if (!component.prepopulate) {
      component.prepopulate = {};
    }

    component.prepopulate.variableName = event;

    if (this.stepId && this.screenJson) {
      this.screenUpdated.emit({
        stepId: this.stepId,
        screenData: this.screenJson,
        outputVariableFields: this.getOutputVariableFields()
      });
    }
  }

  public updatePrepopulateField(componentId: string, event: Event) {
    if (!this.screenJson?.components) {
      return;
    }

    const component = this.screenJson.components.find(component => component.id === componentId);

    // @ts-ignore
    if (!component.prepopulate) {
      component.prepopulate = {};
    }

    component.prepopulate.fieldName = event;

    if (this.stepId && this.screenJson) {
      this.screenUpdated.emit({
        stepId: this.stepId,
        screenData: this.screenJson,
        outputVariableFields: this.getOutputVariableFields()
      });
    }
  }

  public getVariableFields(variableName: string): IVariableField[] {
    return this.variables?.find(variable => variable.name === variableName)?.fields || [];
  }

  public addNewValidation() {
    const dialogRef = this.dialogService.open(ValidationDesignerComponent, {});
    dialogRef.afterClosed.subscribe((result) => {
      if (result['validation']) {
        // TODO: add new validation
      }
    });
  }
}
