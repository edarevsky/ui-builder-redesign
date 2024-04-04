import {Injectable} from '@angular/core';
import {map, Observable, of, tap} from 'rxjs';
import {API_KEY} from '../const/apikey';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class FlowService {
  private apiKey = API_KEY;

  flows: { [key: string]: any } = [];

  constructor(private httpService: HttpService) {

  }

  getFlow(flowId: string): Observable<any> {
    return this.httpService.getFlow(this.apiKey, flowId).pipe(
      map((res: any) => {
        return res.flow ? JSON.parse(res.flow) : null;
      }),
      tap((flow) => this.flows[flowId] = flow)
    );
  }

  setFlow(flow: string, flowId: string): Observable<any> {
    return this.httpService.setFlow(this.apiKey, flowId, flow).pipe(
      tap((flow) => {
        // @ts-ignore
        delete this.flows[flowId];
      })
    );
  }

  startFlow(flowId: string) {
    return this.httpService.startFlow(this.apiKey, flowId);
  }

  continueFlow(flowInstanceId: string, inputData: { [key: string]: any }, apiKey: string = this.apiKey) {
    return this.httpService.continueFlow(this.apiKey, flowInstanceId, inputData);
  }
}

