import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  DndDraggableDirective,
  DndDragImageRefDirective,
  DndDropEvent,
  DndDropzoneDirective,
  DndPlaceholderRefDirective
} from 'ngx-drag-drop';
import {CommonModule} from '@angular/common';
import {EffectAllowed} from 'ngx-drag-drop/lib/dnd-types';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { v4 as uuid } from 'uuid';
import {
  ButtonComponent,
  ContentDensityDirective, FormControlComponent, FormHeaderComponent, FormItemComponent, FormLabelComponent,
  ListComponent,
  ListIconDirective,
  ListItemComponent,
  ListTitleDirective, OptionComponent,
  PanelComponent,
  PopoverBodyComponent,
  PopoverComponent,
  PopoverControlComponent,
  PopoverTriggerDirective, SelectComponent
} from '@fundamental-ngx/core';

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
    ButtonComponent
  ],
  templateUrl: './ui-builder-custom.component.html',
  styleUrl: './ui-builder-custom.component.scss'
})
export class UiBuilderCustomComponent {
  @Input() stepId: string | null = null;
  @Output() screenUpdated = new EventEmitter<{stepId: string, screenData: any}>();

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

  @Input() screenJson: {
    components: Array<any>
  } | null = null;

  ngOnInit() {
    if (!this.screenJson) {
      this.screenJson =  {
        components: []
      }
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
      if (typeof(event.index) !== 'undefined') {
        this.screenJson.components.splice(event.index, 0, {
          id,
          label: event.data.label,
          placeholder: event.data.placeholder,
          type: event.data.type,
          clickAction: event.data.clickAction,
          mappedField: event.data.mappedField,
          inputType: event.data.inputType,
        });
      }
    } else if (event.dropEffect === 'move') {
      const prevIndex = this.screenJson.components.findIndex(component => component.id === event.data.id);
      this.screenJson.components.splice(prevIndex, 1);
      if (typeof(event.index) !== 'undefined') {
        this.screenJson.components.splice(event.index, 0, event.data);
      }
    }

    this.screenUpdatedEmit();

    console.log('dropped', JSON.stringify(event, null, 2));
  }

  updatePropertySelect(componentId: string, propertyName: string, value: string) {
    if (!this.screenJson?.components) {
      return;
    }

    const component = this.screenJson.components.find(component => component.id === componentId);
    debugger
    // @ts-ignore
    component[propertyName] = value;

    this.screenUpdatedEmit();
  }

  updateProperty(componentId: string, propertyName: string, event: Event) {
    if (!this.screenJson?.components) {
      return;
    }

    const component = this.screenJson.components.find(component => component.id === componentId);
    debugger
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
}
