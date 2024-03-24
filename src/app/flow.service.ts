import { Injectable } from '@angular/core';
import {HttpService} from './services/http.service';
import {Observable, of, switchMap, tap} from 'rxjs';
import {IVariableField} from './variable-designer/variable-designer.component';

@Injectable({
  providedIn: 'root'
})
export class FlowService {
  private apiKey = '6_2_oLrwz7LDNaIY_U4ZsWZz-g';
  private flowId = 'flow4'

  flows: { [key: string]: any } = [];

  constructor(private httpService: HttpService) {

  }

  getFlow(flowId = this.flowId): Observable<any> {
    if (this.flows[flowId]) {
      return of(this.flows[flowId]);
    }

    return this.httpService.getFlow(this.apiKey, flowId).pipe(
      tap((flow) => {
        // @ts-ignore
        this.flows[this.flowId] = flow;
      })
    );
  }

  setFlow(flow: string, flowId = this.flowId): Observable<any> {
    return this.httpService.setFlow(this.apiKey, flowId, flow).pipe(
      tap((flow) => {
        // @ts-ignore
        delete this.flows[this.flowId];
      })
    );
  }

  updateFlowVariables(variables: IVariableField[]) {
    debugger
    return this.getFlow()
    .pipe(
        switchMap(flow => {
          flow.variables = variables;
          return this.setFlow(flow);
        })
      );
  }

  updateFlowDefinition(screenId: string, screenDefinition: any) {
    return this.getFlow()
    .pipe(
      switchMap(flow => {
        const node = flow.nodes((node: any) => node.screenId === screenId);
        node.screenDefinition = screenDefinition;
        return this.setFlow(flow);
      })
    );
  }


  startFlow(flowId = this.flowId) {
    return this.httpService.startFlow(this.apiKey, flowId);
  }

  continueFlow(flowInstanceId: string, inputData: {[key: string]: any}, apiKey: string = this.apiKey) {
    return this.httpService.continueFlow(this.apiKey, flowInstanceId, inputData);
  }
}

