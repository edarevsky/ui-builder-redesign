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
    return this.getCurrentVariables()?.filter((variable: any) => variable.stepId !== stepId);
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
    component.validations.push({
      name: validation.name,
      isEnabled: false
    });

    if (!flowDefinition.availableValidations) {
      flowDefinition.availableValidations = [];
    }
    flowDefinition.availableValidations.push(validation);
    this.updateFlow(flowDefinition);
  }

  public getValidationByName(validationName: string) {
    const flowDefinition = this.flowDefinition$.getValue();
    return flowDefinition?.availableValidations.find((validation: any) => validation.name === validationName);
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
}
