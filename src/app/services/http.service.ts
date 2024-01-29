import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }
  private gigyaUrl = 'https://localdev.gigya.net' // 'https://accounts.il3.gigya.com';

  private setFlowUrl = `${this.gigyaUrl}/accounts.setGigyaFlow`;
  private getFlowUrl = `${this.gigyaUrl}/accounts.getGigyaFlow`;

  private apiKey = '6_2_oLrwz7LDNaIY_U4ZsWZz-g';
  private flowId = 'flow2'

  private headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
  });

  getFlow(flowJson: string) {
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
}
