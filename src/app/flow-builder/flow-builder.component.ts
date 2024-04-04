import {Component} from '@angular/core';
import {IVariable, SwdFlowComponent} from '../swd-flow/swd-flow.component';
import {UiBuilderCustomComponent} from '../ui-builder-custom/ui-builder-custom.component';
import {BehaviorSubject, tap} from 'rxjs';
import {AsyncPipe, CommonModule} from '@angular/common';
import {
  BarComponent,
  BarElementDirective,
  BarLeftDirective,
  BarMiddleDirective, BarRightDirective,
  ButtonBarComponent, TitleComponent
} from '@fundamental-ngx/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {VariableDesignerComponent} from '../variable-designer/variable-designer.component';

import {FlowDataService} from '../services/flow-data.service';

@Component({
  selector: 'app-flow-builder',
  standalone: true,
  imports: [
    SwdFlowComponent,
    UiBuilderCustomComponent,
    CommonModule,
    AsyncPipe,
    BarComponent,
    BarElementDirective,
    BarLeftDirective,
    BarMiddleDirective,
    ButtonBarComponent,
    TitleComponent,
    BarRightDirective,
    RouterOutlet,
    VariableDesignerComponent,
  ],
  templateUrl: './flow-builder.component.html',
  styleUrl: './flow-builder.component.scss'
})
export class FlowBuilderComponent {
  selectedStep$ = new BehaviorSubject<any>(null);
  openStep$ = new BehaviorSubject<string | null>(null);
  loadingFinished$ = new BehaviorSubject<any>(false);
  openEditVariable$ = new BehaviorSubject<any>(null);

  constructor(private flowDataService: FlowDataService, private activatedRoute: ActivatedRoute) {
  }

  ngAfterViewInit() {
    if (this.flowId) {
      this.flowDataService.init(this.flowId);
    }
  }

  get flowId() {
    return this.activatedRoute.snapshot.queryParamMap.get('flowId');
  }

  get screenDefinition() {
    // @ts-ignore
    return this.openStep$.getValue()?.['screenDefinition']
  }

  get stepId(): any {
    // @ts-ignore
    return this.openStep$.getValue()?.['id'];
  }

  get nodes() {
    return this.flowDefinition?.nodes;
  }

  get flowDefinition(): any {
    return this.flowDataService.getFlow()
  }

  onStepSelected(stepId: any) {
    this.selectedStep$.next(stepId);
  }

  onStepOpen(stepId: string) {
    const node = this.nodes?.find((node: any) => node.id === stepId);
    this.openStep$.next(node);
  }

  onBackButtonClick() {
    this.openStep$.next(null);
    this.openEditVariable$.next(null);
  }
}
