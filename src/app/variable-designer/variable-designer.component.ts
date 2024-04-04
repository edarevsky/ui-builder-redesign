import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  ButtonComponent,
  FormControlComponent,
  FormItemComponent,
  FormLabelComponent,
  OptionComponent,
  SelectComponent
} from '@fundamental-ngx/core';
import {AsyncPipe, CommonModule, NgForOf} from '@angular/common';

export interface IVariableField {
  name: string;
  defaultValue?: string;
  type: 'string' | 'number' | 'boolean';
}

@Component({
  selector: 'app-variable-designer',
  standalone: true,
  imports: [
    FormItemComponent,
    FormLabelComponent,
    FormControlComponent,
    NgForOf,
    OptionComponent,
    SelectComponent,
    ButtonComponent,
    AsyncPipe,
    CommonModule
  ],
  templateUrl: './variable-designer.component.html',
  styleUrl: './variable-designer.component.scss'
})
export class VariableDesignerComponent {
  // @ts-ignore
  @Input() variable: { name: string, fields: IVariableField[] };
  @Output() variableChange = new EventEmitter<{ name: string, fields: IVariableField[] }>();

  public updateFieldProperty(field: IVariableField, property: string, data: any) {
    // @ts-ignore
    field[property] = data?.value;
  }

  public addField() {
    const prevValue = this.variable.fields || [];
    this.variableChange.emit({
      ...this.variable,
      fields: [
        ...prevValue,
        {
          name: '',
          defaultValue: '',
          type: 'string'
        }
      ]
    });
  }

  public removeField(index: number) {
    let fields = [...this.variable.fields];
    if (this.variable.fields?.length > 1) {
      fields = fields.splice(index, 1);
    } else {
      fields = []
    }

    this.variableChange.emit({
      ...this.variable,
      fields
    });
  }

  public isLastFieldEmpty() {
    return this.variable.fields?.length > 0  && !this.variable.fields?.[this.variable.fields?.length - 1]?.name;
  }
}
