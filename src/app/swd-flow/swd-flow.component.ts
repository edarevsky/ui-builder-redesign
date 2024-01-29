import { Component } from '@angular/core';
import { SequentialWorkflowDesignerModule } from 'sequential-workflow-designer-angular';
import {
  Definition,
  Designer, Properties, RootEditorContext, Step, StepEditorContext,
  StepsConfiguration,
  ToolboxConfiguration, Uid,
  ValidatorConfiguration
} from 'sequential-workflow-designer';
import {MatFormField} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {MatInput} from '@angular/material/input';

interface RootEditorWrapper {
  definition: Definition;
  context: RootEditorContext;
  isReadonly: boolean;
}

interface StepEditorWrapper {
  step: Step;
  definition: Definition;
  context: StepEditorContext;
  isReadonly: boolean;
}

function createStep(): Step {
  return {
    id: Uid.next(),
    componentType: 'task',
    name: 'Step',
    properties: { velocity: 0 },
    type: 'task'
  };
}

function createDefinition(): Definition {
  return {
    properties: {
      velocity: 0
    },
    sequence: [createStep()]
  };
}


@Component({
  selector: 'app-swd-flow',
  standalone: true,
  imports: [SequentialWorkflowDesignerModule, MatFormField, MatInput, MatButton, MatTab, MatTabGroup],
  templateUrl: './swd-flow.component.html',
  styleUrl: './swd-flow.component.scss'
})
export class SwdFlowComponent {
  private designer?: Designer;

  public definition: Definition = createDefinition();
  public definitionJSON?: string;
  public selectedStepId: string | null = null;
  public isReadonly = false;
  public isToolboxCollapsed = false;
  public isEditorCollapsed = false;
  public isValid?: boolean;

  public readonly toolboxConfiguration: ToolboxConfiguration = {
    groups: [
      {
        name: 'Step',
        steps: [createStep()]
      }
    ]
  };
  public readonly stepsConfiguration: StepsConfiguration = { };
  public readonly validatorConfiguration: ValidatorConfiguration = {
    step: (step: Step) => !!step.name && Number(step.properties['velocity']) >= 0,
    root: (definition: Definition) => Number(definition.properties['velocity']) >= 0
  };

  public ngOnInit() {
    this.updateDefinitionJSON();
  }

  public onDesignerReady(designer: Designer) {
    this.designer = designer;
    this.updateIsValid();
    console.log('designer ready', this.designer);
  }

  public onDefinitionChanged(definition: Definition) {
    this.definition = definition;
    this.updateIsValid();
    this.updateDefinitionJSON();
    console.log('definition has changed');
  }

  public onSelectedStepIdChanged(stepId: string | null) {
    this.selectedStepId = stepId;
  }

  public onIsToolboxCollapsedChanged(isCollapsed: boolean) {
    this.isToolboxCollapsed = isCollapsed;
  }

  public onIsEditorCollapsedChanged(isCollapsed: boolean) {
    this.isEditorCollapsed = isCollapsed;
  }

  public updateName(step: Step, event: Event, context: StepEditorContext) {
    step.name = (event.target as HTMLInputElement).value;
    context.notifyNameChanged();
  }

  public updateProperty(properties: Properties, name: string, event: Event, context: RootEditorContext | StepEditorContext) {
    properties[name] = (event.target as HTMLInputElement).value;
    context.notifyPropertiesChanged();
  }

  public reloadDefinitionClicked() {
    this.definition = createDefinition();
    this.updateDefinitionJSON();
  }

  public toggleReadonlyClicked() {
    this.isReadonly = !this.isReadonly;
  }

  public toggleSelectedStepClicked() {
    if (this.selectedStepId) {
      this.selectedStepId = null;
    } else if (this.definition.sequence.length > 0) {
      this.selectedStepId = this.definition.sequence[0].id;
    }
  }

  public toggleToolboxClicked() {
    this.isToolboxCollapsed = !this.isToolboxCollapsed;
  }

  public toggleEditorClicked() {
    this.isEditorCollapsed = !this.isEditorCollapsed;
  }

  private updateDefinitionJSON() {
    this.definitionJSON = JSON.stringify(this.definition, null, 2);
  }

  private updateIsValid() {
    this.isValid = this.designer?.isValid();
  }
}
