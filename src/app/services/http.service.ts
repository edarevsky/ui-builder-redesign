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

  private headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    'Access-Control-Allow-Origin': '*',
  });

  getFlow(apiKey: string, flowId: string) {
    return this.http.get<any>(this.getFlowUrl, {
      params: {
        flowId,
        apiKey
      }
    });
  }

  setFlow(apiKey: string, flowId: string, flow: string) {
    return this.http.get<any>(this.setFlowUrl, {
      params: {
        apiKey,
        flowId,
        flow
      }
    });
  }

  startFlow(apiKey: string, flowId: string) {
    return this.http.get<any>(this.startGigyaFlow, {
      params: {
        flowId,
        apiKey,
      }
    });
  }

  continueFlow(apiKey: string, flowInstanceId: string, inputData: {[key: string]: any}) {
    return this.http.get<any>(this.continueGigyaFlow, {
      params: {
        flowInstanceId,
        apiKey,
        inputData: JSON.stringify(inputData)
      }
    });
  }

  async getSchema() {
    // @ts-ignore
    const schema = await window.gigya.accounts.getSchema();
  }
}
