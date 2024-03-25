import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpService} from '../services/http.service';
import {BehaviorSubject} from 'rxjs';
import {MatButton} from '@angular/material/button';
import {MatList, MatListItem, MatListItemLine, MatListItemTitle} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {RegisterScreenComponent} from '../screens/register-screen/register-screen.component';
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

@Component({
  selector: 'app-run-flow',
  standalone: true,
  imports: [CommonModule, MatButton, MatList, MatListItem, MatIcon, MatListItemTitle, MatListItemLine, RegisterScreenComponent, FormControlComponent, FormHeaderComponent, FormItemComponent, FormLabelComponent, OptionComponent, PopoverBodyComponent, PopoverComponent, PopoverControlComponent, SelectComponent, ButtonComponent],
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

  public formData: {[key: string]: any} = {};

  constructor(private flowService: FlowService, private activatedRoute: ActivatedRoute) {}

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
    return this.flowService.startFlow(this.flowId).subscribe((res: any) => this.onFlowProgress(res, true));
  }

  public continueFlow(data: {[key: string]: any}) {
    this.flowService.continueFlow(this.flowInstanceId$.getValue(), data)
      .subscribe((res: any) => this.onFlowProgress(res, false));
  }

  public onFlowProgress(res: any, isFlowStarted: boolean = false) {
    this.isFlowFinished$.next(res.isFlowFinished);
    this.isFlowStarted$.next(isFlowStarted);
    this.flowInstanceId$.next(res.flowInstanceId);
    this.executedNodes$.next(res.executedNodes);
    this.screenId$.next(res.screenId);
    this.screenDefinition$.next(res.screenDefinition);
  }

  public clickAction(component: any) {
    if (component.clickAction === 'continueFlow') {
      this.continueFlow(this.formData);
    }
  }
}
