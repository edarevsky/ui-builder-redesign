import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ActionRequestData} from '../const/actionFields';
import {CommonModule} from '@angular/common';
import {
  FormControlComponent,
  FormItemComponent,
  FormLabelComponent,
  OptionComponent,
  SelectComponent
} from '@fundamental-ngx/core';

@Component({
  selector: 'app-action-variable-mapping',
  standalone: true,
  imports: [CommonModule, FormControlComponent, FormItemComponent, FormLabelComponent, SelectComponent, OptionComponent],
  templateUrl: './action-variable-mapping.component.html',
  styleUrl: './action-variable-mapping.component.scss'
})
export class ActionVariableMappingComponent {
  // @ts-ignore
  @Input() actionType: string;
  @Input() inputVariableFields: any;
  @Input() mapping: {[key: string]: string | null} = {}

  @Output() updateMapping = new EventEmitter<{[key: string]: string | null}>();

  get expectedFields() {
    // @ts-ignore
    return ActionRequestData[this.actionType];
  }

  public updateFieldMapping(field: string, value: string) {
    debugger
    const mapping = {...this.mapping};
    mapping[field] = value || null;
    this.updateMapping.emit(mapping);
  }
}
