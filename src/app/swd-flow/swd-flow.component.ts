import {Component, EventEmitter, Input, Output} from '@angular/core';
import {SequentialWorkflowDesignerModule} from 'sequential-workflow-designer-angular';
import {
  Definition,
  Designer, Step, StepDefinition, StepEditorContext,
  StepsConfiguration,
  ToolboxConfiguration, Uid,
  ValidatorConfiguration
} from 'sequential-workflow-designer';
import {CommonModule} from '@angular/common';
import {
  BarComponent,
  BarElementDirective,
  BarLeftDirective, BarMiddleDirective, BarRightDirective, ButtonBarComponent,
  ButtonComponent,
  FormControlComponent,
  FormHeaderComponent, FormInputMessageGroupComponent,
  FormItemComponent,
  FormLabelComponent, FormMessageComponent, InputGroupComponent, OptionComponent,
  SelectComponent
} from '@fundamental-ngx/core';
import {FormsModule} from '@angular/forms';
import {cloneDeep} from 'lodash';
import {IVariableField} from '../variable-designer/variable-designer.component';

function createDefinition(): Definition {
  return {
    properties: {
     /* variables: []*/
    },
    sequence: []
  };
}

const startFlowNode = {
  id: Uid.next(),
  type: 'flowStart'
};

const endFlowNode = {
  id: Uid.next(),
  type: 'flowEnd'
};

export interface IVariable {
  name: string,
  stepType: string,
  stepName: string,
  action: string,
  stepId: string,
  fields: IVariableField[]
}

@Component({
  selector: 'app-swd-flow',
  standalone: true,
  imports: [SequentialWorkflowDesignerModule, CommonModule, FormHeaderComponent, FormItemComponent, FormLabelComponent, FormControlComponent, SelectComponent, OptionComponent, ButtonComponent, BarLeftDirective, BarMiddleDirective, BarRightDirective, ButtonBarComponent, BarElementDirective, BarComponent, FormInputMessageGroupComponent, FormMessageComponent, InputGroupComponent, FormsModule],
  templateUrl: './swd-flow.component.html',
  styleUrl: './swd-flow.component.scss'
})
export class SwdFlowComponent {
  private designer?: Designer;
  public definition: Definition = createDefinition();
  public selectedStepId: string | null = null;
  public isReadonly = false;
  public isToolboxCollapsed = false;
  public isEditorCollapsed = false;
  public isValid?: boolean;
  public variables:  IVariable[] = [];

  @Input() selectedStep = null;
  @Input() flowDefinition = null;

  @Output() stepSelected = new EventEmitter<any>();
  @Output() stepOpen = new EventEmitter<any>();
  @Output() definitionUpdated = new EventEmitter<any>();
  @Output() openVariableEditor = new EventEmitter<any>();

  // Hack to see if we added new steps
  // @ts-ignore
  public oldDefinition: Definition;

  public readonly toolboxConfiguration: ToolboxConfiguration = {
    groups: [
      {
        name: 'Blocks',
        steps: [
          this.createActionStep(),
          this.createScreenStep()
        ]
      },
      {
        name: 'Control FLow',
        steps: [
          this.createIfStep()
        ]
      }
    ]

  };

  private createActionStep(): StepDefinition {
    debugger
    return {
      componentType: 'task',
      name: 'Action',
      properties: {
        displayName: 'Action',
        action: '',
        actionName: '',
        outputVariableName: '',
        inputVariableName: ''
      },
      type: 'action'
    };
  }

  private createScreenStep(): StepDefinition {
    debugger
    return {
      componentType: 'task',
      name: 'Screen',
      properties: {
        displayName: 'Screen',
        screenId: '',
        actionName: '',
        outputVariableName: '',
        inputVariableName: '',
        screenDefinition: {
          components: []
        }
      },
      type: 'screen'
    };
  }

  private createIfStep() {
    return {
      id: Uid.next(),
      componentType: 'switch',
      type: 'controlFlow',
      name: 'Condition',
      branches: {
        'true': [],
        'false': []
      },
      properties: {
        displayName: 'Condition',
        condition: '',
        inputVariableName: ''
      }
    };
  }

  public readonly stepsConfiguration: StepsConfiguration = {
    iconUrlProvider: (componentType, type) => {
      switch (type) {
        case 'screen':
          return 'assets/screen.svg';
        case 'action':
          return 'assets/action.svg';
        case 'controlFlow':
          return 'assets/controlFlow.svg';
        default:
          return null;
      }
    }
  };
  public readonly validatorConfiguration: ValidatorConfiguration = {};

  public async ngOnInit() {
    this.definition = this.flowDefinition ? this.convertGigyaFlow(this.flowDefinition) : createDefinition();
    this.oldDefinition = cloneDeep(this.definition);
    this.updateVariables();
  }

  public onDesignerReady(designer: Designer) {
    this.designer = designer;
    if (this.selectedStep) {
      this.designer?.selectStepById(this.selectedStep);
    }
    this.updateIsValid();
    console.log('designer ready', this.designer);
  }

  public updateVariables() {
    this.variables = [];
    const gigyaFlow = this.convertDefinitionToGigyaFlow(this.definition)
    Object.values(gigyaFlow.nodes).forEach((node: any) => {
      if (node['outputVariableName']) {
        debugger
        this.variables.push({
          name: node['outputVariableName'] as string,
          stepType: node.type,
          stepName: node.screenId || node.actionName,
          stepId: node.id,
          action: node['action'] as string,
          fields: []
        })
      }
    });

    console.log(this.variables)
  }

  public onDefinitionChanged(definition: Definition) {
    debugger
    this.definition = definition;
    this.updateIsValid();
    const gigyaFlow = this.convertDefinitionToGigyaFlow(this.definition);
    const oldGigyaFlow = this.convertDefinitionToGigyaFlow(this.oldDefinition);


    if (gigyaFlow && oldGigyaFlow && gigyaFlow.nodes.length > oldGigyaFlow.nodes.length) {
      // @ts-ignore
      const newNode = gigyaFlow.nodes.find(node => !oldGigyaFlow.nodes.find(oldNode => oldNode.id === node.id));
      this.onNodeAdded(newNode.id);
    }
    this.updateVariables();
    this.oldDefinition = cloneDeep(this.definition);
    this.definitionUpdated.emit(gigyaFlow)
    console.log('definition has changed');
  }

  public onSelectedStepIdChanged(stepId: string | null) {
    this.selectedStepId = stepId;
    this.stepSelected.emit(stepId);
    debugger
    console.log('selected step id changed')
  }

  // TODO: avoid two calls
  public onNodeAdded(stepId: any) {
    debugger
    if (stepId) {
      debugger
      const step = this.designer?.getWalker().getById(this.definition, stepId);
      if (step) {
        step.properties['outputVariableName'] = `${step.type}_output_${step.id}`;
      }
    }
  }

  public onIsToolboxCollapsedChanged(isCollapsed: boolean) {
    this.isToolboxCollapsed = isCollapsed;
  }

  public onIsEditorCollapsedChanged(isCollapsed: boolean) {
    this.isEditorCollapsed = isCollapsed;
  }

  public updateProperty(step: Step, name: string, data: any, context: StepEditorContext, updateName = false) {
    const properties = step.properties;
    const value = data?.value || '';
    const displayName: string = properties['displayName'] as string;
    step.properties[name] = value;
    if (updateName) {
      step.name = value ? `${displayName} : ${value}` : displayName;
    }
    context.notifyPropertiesChanged();
    context.notifyNameChanged();
  }

  private updateIsValid() {
    this.isValid = this.designer?.isValid();
  }

  public updateInputProperty(step: Step, data: any, context: StepEditorContext) {
    step.properties['inputVariableName'] = data?.value || '';
    context.notifyPropertiesChanged();
  }

  private convertDefinitionToGigyaFlow(definition: Definition): any {
    const gigyaFlowDefinition: { nodes: any[], connections: any[] } = {
      nodes: [startFlowNode, endFlowNode],
      connections: []
    };

    const nextStep = definition.sequence[0] || endFlowNode;

    gigyaFlowDefinition.connections.push({
      id: `${startFlowNode.id}.${nextStep?.id}`,
      description: `From ${startFlowNode.type} to ${nextStep.name || nextStep.type}`,
      startNodeId: startFlowNode.id,
      endNodeId: nextStep?.id
    });

    const convertedSequence = this.convertSequence(definition.sequence, endFlowNode);

    gigyaFlowDefinition.nodes = [...gigyaFlowDefinition.nodes, ...convertedSequence.nodes];
    gigyaFlowDefinition.connections = [...gigyaFlowDefinition.connections, ...convertedSequence.connections];

    return gigyaFlowDefinition;
  }

  private convertSequence(sequence: Step[], endStep: any): { nodes: any[], connections: any[] } {

    const gigyaFlowDefinition: { nodes: any[], connections: any[] } = {
      nodes: [],
      connections: []
    };

    const endStepProps = {
      id: endStep.id,
      type: endStep.type,
      screenId: endStep.properties?.['screenId'],
      action: endStep.properties?.['action'],
      actionName: endStep.properties?.['actionName'],
      condition: endStep.properties?.['condition'],
      outputVariableName: endStep.properties?.['outputVariableName'],
      inputVariableName: endStep.properties?.['inputVariableName'],
      screenDefinition:  endStep.properties?.['screenDefinition']
    };

    sequence.forEach((step: Step, index) => {
      gigyaFlowDefinition.nodes.push({
        id: step.id,
        type: step.type,
        screenId: step.properties?.['screenId'],
        actionName: step.properties?.['actionName'],
        condition: step.properties?.['condition'],
        outputVariableName: step.properties?.['outputVariableName'],
        inputVariableName: step.properties?.['inputVariableName'],
        screenDefinition: step.properties?.['screenDefinition']
      });

      if (step.type === 'controlFlow') {
        const conditionDefinition = this.convertConditionDefinition(step, sequence[index + 1] || endStepProps);
        gigyaFlowDefinition.nodes = [...gigyaFlowDefinition.nodes, ...conditionDefinition.nodes];
        gigyaFlowDefinition.connections = [...gigyaFlowDefinition.connections, ...conditionDefinition.connections];
        gigyaFlowDefinition.nodes.map(nodes => {
          nodes.controlFlowId = step.id;
        });
        gigyaFlowDefinition.connections.map(connection => {
          connection.controlFlowId = step.id;
        });
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
    });

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
    const trueBranchDefinition = this.convertSequence(trueSequence, endStep);
    // @ts-ignore
    const falseBranchDefinition = this.convertSequence(falseSequence, endStep);

    return {
      nodes: [...trueBranchDefinition.nodes, ...falseBranchDefinition.nodes],
      connections: [...connections, ...trueBranchDefinition.connections, ...falseBranchDefinition.connections]
    };
  }

  public convertGigyaFlow(gigyaFlow: any) {
    const startNode = gigyaFlow.nodes.find((node: any) => node.type === 'flowStart');

    return {
      properties: {},
      sequence: this.convertGigyaFlowToSequence(gigyaFlow, startNode)
    };
  }

  public convertGigyaFlowToSequence(gigyaFlow: any, startNode?: any, controlFlowId?: string): any[] {
    let sequence = [];
    let nextNode = startNode;

    while (nextNode || (controlFlowId && nextNode?.controlFlowId === controlFlowId)) {
      let nextNodeId: string;
      if (nextNode.type === 'controlFlow') {
        let nextNodes = gigyaFlow.connections.filter((connection: any) => connection.startNodeId === nextNode.id);

        const branches: { true?: any[], false?: any[] } = {};
        const trueBranchStartId = nextNodes.find((connection: any) => connection.conditionResult === true).endNodeId;
        const falseBranchStartId = nextNodes.find((connection: any) => connection.conditionResult === false).endNodeId;

        branches['true'] = this.convertGigyaFlowToSequence(gigyaFlow, gigyaFlow.nodes.find((node: any) => node.id === trueBranchStartId), nextNode.id);
        branches['false'] = this.convertGigyaFlowToSequence(gigyaFlow, gigyaFlow.nodes.find((node: any) => node.id === falseBranchStartId), nextNode.id);

        let lastNodeTrue = branches['true'][branches['true']?.length - 1];
        let lastNodeFalse = branches['false'][branches['false']?.length - 1];

        if (lastNodeTrue && lastNodeFalse && lastNodeTrue.id === lastNodeFalse.id) {
          nextNodeId = lastNodeTrue.id;
          branches['true']?.pop();
          branches['false']?.pop();
        }

        sequence.push({
          componentType: 'switch',
          type: nextNode.type,
          id: nextNode.id,
          name: `Condition: ${nextNode.condition}`,
          branches,
          properties: {
            condition: nextNode.condition,
            displayName: 'Condition',
            inputVariableName: nextNode['inputVariableName']
          }
        });
      } else if (nextNode.type === 'flowStart') {
        nextNodeId = gigyaFlow.connections.find((connection: any) => connection.startNodeId === nextNode.id)?.endNodeId;
      } else if (nextNode.type !== 'flowEnd') {
        const displayName = nextNode.type === 'screen' ? 'Screen' : 'Action';
        const name = nextNode['screenId'] || nextNode['actionName'];

        sequence.push({
          componentType: 'task',
          type: nextNode.type,
          id: nextNode.id,
          name: `${displayName}: ${name}`,
          properties: {
            displayName,
            screenId: nextNode['screenId'],
            action: nextNode['action'],
            actionName: nextNode['actionName'],
            outputVariableName: nextNode['outputVariableName'],
            inputVariableName: nextNode['inputVariableName'],
            screenDefinition: nextNode['screenDefinition']
          }
        });

        nextNodeId = gigyaFlow.connections.find((connection: any) => connection.startNodeId === nextNode.id)?.endNodeId;
      }

      nextNode = gigyaFlow.nodes.find((node: any) => node.id === nextNodeId);
    }

    return sequence;
  }

  stepEdit(step: Step) {
    this.stepOpen.emit(step.id);
  }
}

