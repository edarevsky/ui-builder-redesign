import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {
  ButtonComponent, FormControlComponent,
  FormInputMessageGroupComponent,
  FormItemComponent,
  FormLabelComponent,
  InputGroupComponent
} from '@fundamental-ngx/core';
import {FormsModule} from '@angular/forms';
import {AsyncPipe, NgIf} from '@angular/common';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-step-result-variable',
  standalone: true,
  imports: [
    FormInputMessageGroupComponent,
    FormItemComponent,
    FormLabelComponent,
    InputGroupComponent,
    FormsModule,
    ButtonComponent,
    FormControlComponent,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './step-result-variable.component.html',
  styleUrl: './step-result-variable.component.scss'
})
export class StepResultVariableComponent {
  @Input() outputVariableName: string | null = null;
  @Input() variables: any[] =[];
  @Output() outputVariableNameChange = new EventEmitter<string>();
  @Output() openVariableEditor = new EventEmitter<string>();
  @Output() removeVariable = new EventEmitter<string>();
  variableName$ = new BehaviorSubject('');

  ngOnChanges(changes: SimpleChanges) {
    if (changes['outputVariableName'].firstChange) {
      this.variableName$.next(changes['outputVariableName'].currentValue);
    }
  }

  public updateOutputVariableName($event: any) {
    debugger
    const variableName = $event?.target?.value || '';
    this.variableName$.next(variableName);
  }

  public editVariable() {
    if (this.outputVariableName) {
      this.openVariableEditor.emit(this.outputVariableName);
    }
  }

  public createVariable() {
    // @ts-ignore
    this.outputVariableNameChange.emit(this.variableName$.getValue());
   /* // @ts-ignore
    this.openVariableEditor.emit(this.variableName$.getValue());*/
  }

  public removeVariableClicked() {
    this.removeVariable.emit(this.variableName$.getValue());
    this.variableName$.next('');
  }

  public get isExistingVariableName(): boolean {
    return !!this.variables.find(variable => variable.name === this.variableName$.getValue());
  }
}
