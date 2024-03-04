import {Component} from '@angular/core';
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
import {MatIcon} from '@angular/material/icon';
import { v4 as uuid } from 'uuid';
import {
  ContentDensityDirective,
  ListComponent,
  ListIconDirective,
  ListItemComponent,
  ListTitleDirective, PanelComponent
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
    PanelComponent
  ],
  templateUrl: './ui-builder-custom.component.html',
  styleUrl: './ui-builder-custom.component.scss'
})
export class UiBuilderCustomComponent {
  componentList = [
    {
      name: 'Input',
      type: 'input',
      iconName: 'ui-notifications',
      label: 'Label',
      placeholder: 'Placeholder'
    },
    {
      name: 'Text',
      type: 'text',
      iconName: 'text',
      label: 'Custom Text'
    }, {
      name: 'Link',
      type: 'link',
      iconName: 'chain-link',
      label: 'Link Text'
    }

    ];

  screenJson: {components: Array<any>} = {
    components: []
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
    if (event.dropEffect === 'copy') {
      const id = uuid();
      this.screenJson.components.push({
        ...event.data,
        id
      });
    } else {
      const prevIndex = this.screenJson.components.findIndex(component => component.id === event.data.id);
      this.screenJson.components.splice(prevIndex, 1);
      if (typeof(event.index) !== 'undefined') {
        this.screenJson.components.splice(event.index, 0, event.data);
      }
    }

    console.log('dropped', JSON.stringify(event, null, 2));
  }
}
