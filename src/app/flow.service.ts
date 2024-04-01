import { Injectable } from '@angular/core';
import {HttpService} from './services/http.service';
import {Observable, of, tap} from 'rxjs';
import {API_KEY} from './const/apikey';

@Injectable({
  providedIn: 'root'
})
export class FlowService {
  private apiKey = API_KEY;
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


  startFlow(flowId = this.flowId) {
    return this.httpService.startFlow(this.apiKey, flowId);
  }

  continueFlow(flowInstanceId: string, inputData: {[key: string]: any}, apiKey: string = this.apiKey) {
    return this.httpService.continueFlow(this.apiKey, flowInstanceId, inputData);
  }
}

