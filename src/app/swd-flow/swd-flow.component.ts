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
import {CommonModule} from '@angular/common';
import {HttpService} from '../services/http.service';

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

function createActionStep(): Step {
  return {
    id: Uid.next(),
    componentType: 'task',
    name: 'Action',
    properties: {
      displayName: 'Action',
      action: ''
    },
    type: 'action'
  };
}

function createScreenStep(): Step {
  return {
    id: Uid.next(),
    componentType: 'task',
    name: 'Screen',
    properties: {
      displayName: 'Screen',
      screenId: ''
    },
    type: 'screen'
  };
}

function createIfStep() {
  return {
    id: Uid.next(),
    componentType: 'switch',
    type: 'controlFlow',
    name: 'Condition',
    branches: {
      'true': [],
      'false': [],
    },
    properties: {
      displayName: 'Condition',
      condition: ''
    }
  };
}


function createDefinition(): Definition {
  return {
    properties: {
      variables: ''
    },
    sequence: []
  };
}

const startFlowNode = {
  id: Uid.next(),
  type: 'flowStart',
}

const endFlowNode = {
  id: Uid.next(),
  type: 'flowEnd',
}



@Component({
  selector: 'app-swd-flow',
  standalone: true,
  imports: [SequentialWorkflowDesignerModule, MatFormField, MatInput, MatButton, MatTab, MatTabGroup, CommonModule],
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

  constructor(private httpService: HttpService) {
  }

  public readonly toolboxConfiguration: ToolboxConfiguration = {
    groups: [
      {
        name: 'Blocks',
        steps: [
          createActionStep(),
          createScreenStep()
        ]
      },
      {
        name: 'Control FLow',
        steps: [
          createIfStep(),
        ]
      }
    ],

  };
  public readonly stepsConfiguration: StepsConfiguration = {
    iconUrlProvider: (componentType, type) => {
      switch (type) {
        case 'screen': return 'assets/screen.svg';
        case 'action': return 'assets/action.svg';
        case 'controlFlow': return 'assets/controlFlow.svg';
        default: return null;
      }
    }
  };
  public readonly validatorConfiguration: ValidatorConfiguration = {};

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
    step.name = (event.target as HTMLInputElement)?.value ||'';
    context.notifyNameChanged();
  }

  public updateProperty(step: Step, name: string, event: Event, context: StepEditorContext) {
    const properties = step.properties;
    const value =  (event.target as HTMLInputElement)?.value ||'';
    const displayName: string = properties['displayName'] as string;
    step.properties[name] = value;
    step.name = value ? `${displayName} : ${value}` : displayName;
    context.notifyPropertiesChanged();
    context.notifyNameChanged();
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
    this.definitionJSON = this.jsonGigyaFlow;
  }

  private updateIsValid() {
    this.isValid = this.designer?.isValid();
  }

  public get jsonGigyaFlow(): string {
    return JSON.stringify(this.convertDefinitionToGigyaFlow(this.definition), null, 2);
  }

  private convertDefinitionToGigyaFlow(definition: Definition): any {
    const gigyaFlowDefinition: {nodes: any[], connections: any[]} = {
      nodes: [startFlowNode, endFlowNode],
      connections: []
    };

    const nextStep = definition.sequence[0] || endFlowNode;

    gigyaFlowDefinition.connections.push({
      id: `${startFlowNode.id}.${nextStep?.id}`,
      description : `From ${startFlowNode.type} to ${nextStep.name || nextStep.type}`,
      startNodeId: startFlowNode.id,
      endNodeId: nextStep?.id
    });

    const convertedSequence = this.convertSequence(definition.sequence, endFlowNode);

    gigyaFlowDefinition.nodes = [...gigyaFlowDefinition.nodes, ...convertedSequence.nodes];
    gigyaFlowDefinition.connections = [...gigyaFlowDefinition.connections, ...convertedSequence.connections];

    return gigyaFlowDefinition;
  }

  private convertSequence(sequence: Step[], endStep: any): {nodes: any[], connections: any[]} {

    const gigyaFlowDefinition: {nodes: any[], connections: any[]} = {
      nodes: [],
      connections: []
    };

    const endStepProps = {
      id: endStep.id,
      type: endStep.type,
      screenId: endStep.properties?.['screenId'],
      action: endStep.properties?.['action'],
      condition: endStep.properties?.['condition'],
    }

    sequence.forEach((step: Step, index ) => {
      gigyaFlowDefinition.nodes.push({
        id: step.id,
        type: step.type,
        screenId: step.properties?.['screenId'],
        action: step.properties?.['action'],
        condition: step.properties?.['condition'],
      });

      if (step.type === 'controlFlow') {
        const conditionDefinition = this.convertConditionDefinition(step, sequence[index + 1] || endStepProps);
        gigyaFlowDefinition.nodes = [...gigyaFlowDefinition.nodes, ...conditionDefinition.nodes];
        gigyaFlowDefinition.connections = [...gigyaFlowDefinition.connections, ...conditionDefinition.connections];
      } else {
        const nextStep = sequence[index + 1] || endStepProps;

        if (nextStep) {
          gigyaFlowDefinition.connections.push({
            id: `${step.id}.${nextStep?.id}`,
            description: `From ${step.name || step.type} to ${nextStep?.name || nextStep?.type}`,
            startNodeId: step.id,
            endNodeId: nextStep?.id
          });
        }
      }
    })

    return gigyaFlowDefinition;
  }

  private convertConditionDefinition(step: Step, endStep: Step): any {
    const connections = [];

    // @ts-ignore
    const trueSequence = step?.['branches']?.['true'];
    // @ts-ignore
    const falseSequence = step?.['branches']?.['false'];

    const trueSequenceNext = trueSequence[0] || endStep;
    const falseSequenceNext = falseSequence[0] || endStep;

    connections.push({
      id: `${step.id}.${trueSequenceNext?.id}`,
      description: `From ${step.name || step.type} - true - to ${trueSequenceNext?.name || trueSequenceNext?.type}`,
      startNodeId: step.id,
      endNodeId: trueSequenceNext?.id,
      conditionResult: true
    });

    connections.push({
      id: `${step.id}.${falseSequenceNext?.id}`,
      description: `From ${step.name || step.type} - false - to ${falseSequenceNext?.name || falseSequenceNext?.type}`,
      startNodeId: step.id,
      endNodeId: falseSequenceNext?.id,
      conditionResult: false
    });

    // @ts-ignore
    const trueBranchDefinition =  this.convertSequence(trueSequence, endStep);
    // @ts-ignore
    const falseBranchDefinition =  this.convertSequence(falseSequence, endStep);

    return {
      nodes: [...trueBranchDefinition.nodes, ...falseBranchDefinition.nodes],
      connections: [...connections, ...trueBranchDefinition.connections, ...falseBranchDefinition.connections]
    }
  }

  public saveFlow() {
    this.httpService.setFlow(JSON.stringify(this.convertDefinitionToGigyaFlow(this.definition))).subscribe((res) => {
      console.log(res);
    });
  }
}
