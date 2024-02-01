import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpService} from '../services/http.service';
import {BehaviorSubject, map, mergeMap, Subject, takeLast} from 'rxjs';
import {MatButton} from '@angular/material/button';
import {MatList, MatListItem, MatListItemLine, MatListItemTitle} from '@angular/material/list';
import {MatIcon} from '@angular/material/icon';
import {RegisterScreenComponent} from '../screens/register-screen/register-screen.component';

@Component({
  selector: 'app-run-flow',
  standalone: true,
  imports: [CommonModule, MatButton, MatList, MatListItem, MatIcon, MatListItemTitle, MatListItemLine, RegisterScreenComponent],
  templateUrl: './run-flow.component.html',
  styleUrl: './run-flow.component.scss'
})
export class RunFlowComponent {
  isFlowFinished$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isFlowStarted$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  flowInstanceId$: BehaviorSubject<string> = new BehaviorSubject('');
  executedNodes$: BehaviorSubject<any> = new BehaviorSubject([]);
  screenId$: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private httpService: HttpService) {}

  public startFlow() {
    return this.httpService.startFlow().subscribe((res: any) => this.onFlowProgress(res, true));
  }

  public continueFlow(data: {profile: {[key: string]: any}}) {
    this.httpService.continueFlow(this.flowInstanceId$.getValue(), data)
      .subscribe((res: any) => this.onFlowProgress(res, false));
  }

  public onFlowProgress(res: any, isFlowStarted: boolean = false) {
    this.isFlowFinished$.next(res.isFlowFinished);
    this.isFlowStarted$.next(isFlowStarted);
    this.flowInstanceId$.next(res.flowInstanceId);
    this.executedNodes$.next(res.executedNodes);
    this.screenId$.next(res.screenId);

    if (res.screenId) {
      this.showScreen(res.screenId)
    }
  }

  public showScreen(screenId: string) {

  }

}
