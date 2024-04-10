import {Component, Input} from '@angular/core';
import {
  ButtonComponent, ContentDensityDirective, DialogService,
  FormControlComponent, FormInputMessageGroupComponent,
  FormItemComponent,
  FormLabelComponent, FormMessageComponent,
  OptionComponent,
  SelectComponent
} from '@fundamental-ngx/core';
import {FlowDataService} from '../services/flow-data.service';
import {JsonPipe, KeyValuePipe, NgForOf, NgIf} from '@angular/common';
import {ValidationEditDialogComponent} from '../validation-edit-dialog/validation-edit-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

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
    ButtonComponent,
    FormInputMessageGroupComponent,
    FormMessageComponent,
    FormsModule,
    ReactiveFormsModule,
    ContentDensityDirective
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


  constructor(private flowDataService: FlowDataService, private dialogService: DialogService) {}

  public getFlow() {
    return this.flowDataService.getFlow();
  }

  get screenDefinition() {
    return this.getFlow()?.nodes.find((node: any) => node.id === this.stepId)?.screenDefinition;
  }

  public get component() {
    return this.screenDefinition?.components?.find((component: any) => component.id === this.componentId);
  }

  public removeValidation() {
    if (!this.componentId) return;
    this.flowDataService.removeValidationFromComponent(this.stepId, this.componentId, this.flowValidation.name)
  }

  public editValidation() {
    const dialogRef = this.dialogService.open(ValidationEditDialogComponent, {
      data: {
        validation: {...this.flowValidation}
      }
    })

    dialogRef.afterClosed.subscribe((result) => {
      if (!this.componentId) {
        return;
      }

      if (result['validation'] && this.stepId) {
        this.flowDataService.editValidation(this.stepId, this.componentId, result['validation']);
      }
    });
  }

  public get flowValidation(): any {
    if (!this.validationName) return {};

    return this.getFlow()?.availableValidations?.find((validation: any) => validation.name === this.validationName)
  }

  public get validationDisplaySettings() {
    return this.component.validations?.find((validation: any) => validation.name === this.validationName)
  }

  public updateErrorMessage(event: Event) {
    if (!this.componentId) {
      return;
    }

    const errorMessage = (event.target as HTMLInputElement)?.value;
    this.flowDataService.updateComponentValidation(this.stepId, this.componentId, {
      ...this.validationDisplaySettings,
      errorMessage
    });
  }
}
