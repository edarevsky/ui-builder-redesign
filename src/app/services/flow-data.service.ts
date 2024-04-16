import { Injectable } from '@angular/core';
import {FlowService} from './flow.service';
import {BehaviorSubject, tap} from 'rxjs';
import {API_KEY} from '../const/apikey';
import {ActionResponseData} from '../const/actionFields';
import {IVariable} from '../swd-flow/swd-flow.component';

@Injectable({
  providedIn: 'root'
})
export class FlowDataService {
  private flowId = 'flow4'
  private flowDefinition$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private variables$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

  private defaultFlow = {
    nodes: [],
    connections: [],
    availableValidations: []
  }

  constructor(private flowService: FlowService) {
    console.log('constructor FlowDataService');
  }

  init(flowId: string) {
    console.log('init FlowDataService');
    this.flowService.getFlow(flowId).subscribe(flow => {
      this.updateFlow(flow || this.defaultFlow);
    });
    this.flowDefinition$.asObservable().pipe(
      tap(flowDefinition => this.saveFlow(flowDefinition, flowId))
    ).subscribe();
  }

  public updateFlow(flowDefinition: any) {
    this.flowDefinition$.next(flowDefinition);
    this.variables$.next(this.getVariables(flowDefinition));
  }

  public getFlow() {
    return this.flowDefinition$.getValue();
  }

  public getCurrentVariables(): IVariable[] {
    console.log('variables', this.variables$.getValue())
    return this.variables$.getValue() || [];
  }

  public getInputVariablesForStep(stepId: string): IVariable[] {
    return this.getCurrentVariables()?.filter((variable: any) => variable.stepId !== stepId) || [];
  }

  private saveFlow(definition: any, flowId: string = this.flowId) {
    if (definition) {
      this.flowService.setFlow(JSON.stringify(definition), flowId).subscribe((res) => {
        console.log(res);
      });
    }
  }

  public addValidationToComponent(stepId: string, componentId: string, validation: any) {
    const flowDefinition = this.flowDefinition$.getValue();
    const node = flowDefinition?.nodes.find((node: any) => node.id === stepId);
    const component = node?.screenDefinition?.components.find((component: any) => component.id === componentId);

    if (!component.validations) {
      component.validations = [];
    }

    if (!component.validations.find((existingValidation: any) => existingValidation.name === validation.name)) {
      component.validations.push({
        name: validation.name,
        isEnabled: false
      });
    }

    if (!flowDefinition.availableValidations) {
      flowDefinition.availableValidations = [];
    }
    if (!flowDefinition.availableValidations.find((existingValidation: any) => existingValidation.name === validation.name)) {
      flowDefinition.availableValidations.push(validation);
    }

    this.updateFlow(flowDefinition);
  }

  public updateComponentValidation(stepId: string, componentId: string, validation: any) {
    const flowDefinition = this.flowDefinition$.getValue();
    const node = flowDefinition?.nodes.find((node: any) => node.id === stepId);
    const component = node?.screenDefinition?.components.find((component: any) => component.id === componentId);

    const index = component.validations.findIndex((existingValidation: any) => existingValidation.name === validation.name);
    if (index > - 1) {
      component.validations.splice(index, 1, validation);
    }

    this.updateFlow(flowDefinition);
  }

  public removeValidationFromComponent(stepId: string, componentId: string, validationName: string) {
    const flowDefinition = this.flowDefinition$.getValue();
    const node = flowDefinition?.nodes.find((node: any) => node.id === stepId);
    const component = node?.screenDefinition?.components.find((component: any) => component.id === componentId);

    const index = component.validations.findIndex((existingValidation: any) => existingValidation.name === validationName);
    if (index > - 1) {
      component.validations.splice(index, 1);
    }
    this.updateFlow(flowDefinition);
  }

  public editValidation(stepId: string, componentId: string, validation: any) {
    const flowDefinition = this.flowDefinition$.getValue();

    const flowIndex = flowDefinition.availableValidations.findIndex((existingValidation: any) => existingValidation.name === validation.name)
    if (flowIndex > - 1) {
      flowDefinition.availableValidations.splice(flowIndex, 1, validation);
    }

    this.updateFlow(flowDefinition);
  }

  public getInputFields(stepId: string) {
    const node = this.flowDefinition$.getValue()?.nodes.find((node: any) => node.id === stepId);
    return node?.inputFields;
  }

  public updateMappedField(stepId: string, inputField: string, variableName: string | undefined, fieldName: string) {
    const flowDefinition = this.flowDefinition$.getValue();
    const node = flowDefinition?.nodes.find((node: any) => node.id === stepId);
    if (!node.inputFields) {
      node.inputFields = {};
    }

    node.inputFields = {...node.inputFields,
      [inputField]: {
        variableName,
        fieldName
      }
    }

    this.updateFlow(flowDefinition)
  }

  private getVariables(gigyaFlow: any): IVariable[] {
    if (!gigyaFlow?.nodes) {
      return [];
    }

    const variables: any[] = [];
    Object.values(gigyaFlow?.nodes).forEach((node: any) => {
      if (node['outputVariableName']) {
        let fields = [];
        if (node.type === 'screen') {
          fields = node['outputVariableFields']
        } else if (node.type === 'action') {
          fields = ActionResponseData[node?.action as keyof typeof ActionResponseData] || []
        }
        variables.push({
          name: node['outputVariableName'] as string,
          stepType: node.type,
          stepName: node.screenId || node.actionName,
          stepId: node.id,
          action: node['action'] as string,
          fields
        });
      }
    });

    return variables;
  }

  public updateValidationStep(stepId: string, fieldName: string, variableName: string, validationName: string) {
    const flowDefinition = this.flowDefinition$.getValue();
    const node = flowDefinition?.nodes.find((node: any) => node.id === stepId);
    if (!node.validations) {
      node.validations = [];
    }

    const index = node.validations.findIndex((validation: any) => validation.variableName === variableName && validation.fieldName === fieldName);

    if (index > -1) {
      node.validations.splice(index, 1, {
        variableName,
        fieldName,
        validationName
      });
    } else {
      node.validations.push({
        variableName,
        fieldName,
        validationName
      });

    }

    this.updateFlow(flowDefinition);
  }
}
