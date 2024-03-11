import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }
  private localUrl = 'https://localdev.gigya.net';
  private il3Url = 'https://accounts.il3-st7.gigya.com';
  private gigyaUrl = this.localUrl; // 'https://accounts.il3.gigya.com';

  private setFlowUrl = `${this.gigyaUrl}/accounts.setGigyaFlow`;
  private getFlowUrl = `${this.gigyaUrl}/accounts.getGigyaFlow`;
  private startGigyaFlow = `${this.gigyaUrl}/accounts.startGigyaFlow`;
  private continueGigyaFlow = `${this.gigyaUrl}/accounts.continueGigyaFlow`;

  private apiKey = '6_2_oLrwz7LDNaIY_U4ZsWZz-g';
  private flowId = 'flow5'

  private headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
  });

  getFlow() {
    return this.http.get<any>(this.getFlowUrl, {
      params: {
        flowId: this.flowId,
        apiKey: this.apiKey,

      }
    });
  }

  setFlow(flowJson: string) {
    return this.http.get<any>(this.setFlowUrl, {
      params: {
        apiKey: this.apiKey,
        flowId: this.flowId,
        flow: flowJson
      },
      headers: {

      }
    });
  }

  startFlow() {
    return this.http.get<any>(this.startGigyaFlow, {
      params: {
        flowId: this.flowId,
        apiKey: this.apiKey,
      }
    });
  }

  continueFlow(flowInstanceId: string, inputData: {[key: string]: any}) {
    return this.http.get<any>(this.continueGigyaFlow, {
      params: {
        flowInstanceId,
        apiKey: this.apiKey,
        inputData: JSON.stringify(inputData)
      }
    });
  }
}
