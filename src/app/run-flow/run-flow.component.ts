import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {BehaviorSubject} from 'rxjs';
import {MatButton} from '@angular/material/button';
import {MatList, MatListItem, MatListItemLine, MatListItemTitle} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {set} from 'lodash';
import {
  ButtonComponent,
  FormControlComponent,
  FormHeaderComponent,
  FormItemComponent,
  FormLabelComponent,
  OptionComponent, PopoverBodyComponent, PopoverComponent, PopoverControlComponent, SelectComponent
} from '@fundamental-ngx/core';
import {FlowService} from '../flow.service';
import {ActivatedRoute} from '@angular/router';
import {CookieService} from '../cookie.service';
import {API_KEY} from '../const/apikey';

@Component({
  selector: 'app-run-flow',
  standalone: true,
  imports: [CommonModule, MatButton, MatList, MatListItem, MatIcon, MatListItemTitle, MatListItemLine, FormControlComponent, FormHeaderComponent, FormItemComponent, FormLabelComponent, OptionComponent, PopoverBodyComponent, PopoverComponent, PopoverControlComponent, SelectComponent, ButtonComponent],
  templateUrl: './run-flow.component.html',
  styleUrl: './run-flow.component.scss'
})
export class RunFlowComponent {
  isFlowFinished$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isFlowStarted$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  flowInstanceId$: BehaviorSubject<string> = new BehaviorSubject('');
  executedNodes$: BehaviorSubject<any> = new BehaviorSubject([]);
  screenId$: BehaviorSubject<string> = new BehaviorSubject('');
  // @ts-ignore
  screenDefinition$: BehaviorSubject<{components: any[]}> = new BehaviorSubject({components: []});
  screenData$: BehaviorSubject<{[key: string]: any}> = new BehaviorSubject({});
  loginToken$:  BehaviorSubject<string> = new BehaviorSubject('');

  public formData: {[key: string]: any} = {};

  constructor(private flowService: FlowService, private activatedRoute: ActivatedRoute, private cookieService: CookieService) {}

  public get screenDefinition() {
    return this.screenDefinition$.getValue();
  }

  get flowId() {
    return this.activatedRoute.snapshot.queryParamMap.get('flowId')  || undefined;
  }

  public updateFormData(fieldName: string, $event: any) {
    set(this.formData, fieldName, $event.target?.value);
  }

  public startFlow() {
    this.cookieService.remove(`glt_${API_KEY}`);
    this.loginToken$.next('');
    return this.flowService.startFlow(this.flowId).subscribe((res: any) => this.onFlowProgress(res, true));
  }

  public continueFlow(data: {[key: string]: any}) {
    this.flowService.continueFlow(this.flowInstanceId$.getValue(), {...data, login_token: this.loginToken$.getValue() || undefined})
      .subscribe((res: any) => this.onFlowProgress(res, false));
  }

  public onFlowProgress(res: any, isFlowStarted: boolean = false) {
    this.isFlowFinished$.next(res.isFlowFinished);
    this.isFlowStarted$.next(isFlowStarted);
    this.flowInstanceId$.next(res.flowInstanceId);
    this.executedNodes$.next(res.executedNodes);
    this.screenId$.next(res.screenId);
    this.screenDefinition$.next(res.screenDefinition);
    this.screenData$.next(res.screenData);
    if (res.loginToken) {
      // TODO: api key to variable
      this.cookieService.setCookie(`glt_${API_KEY}`, res.loginToken, 60 * 60 * 24 * 365);
      this.loginToken$.next(res.loginToken);
    }
  }

  public clickAction(component: any) {
    if (component.clickAction === 'continueFlow') {
      const data= {...this.formData}
      const loginToken = this.loginToken$.getValue();
      if (loginToken) {
        data['login_token'] = loginToken;

      }

      this.continueFlow(data);
    }
  }
}
