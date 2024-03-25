import {Component, ViewChild} from '@angular/core';
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
import {HttpService} from '../services/http.service';
import {FlowService} from '../flow.service';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {VariableDesignerComponent} from '../variable-designer/variable-designer.component';

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
  flowDefinition$ = new BehaviorSubject<any>(null);
  loadingFinished$ = new BehaviorSubject<any>(false);
  openEditVariable$ = new BehaviorSubject<any>(null);
  variables$: BehaviorSubject<IVariable[]>   = new BehaviorSubject<IVariable[]>([]);

  constructor(private flowService: FlowService, private activatedRoute: ActivatedRoute) {
    // TODO: unsubscribe
    this.flowDefinition$.asObservable().pipe(
      tap(flowDefinition => this.saveFlow(flowDefinition))
    ).subscribe();
  }

  get screenDefinition() {
    // @ts-ignore
    return this.openStep$.getValue()?.['screenDefinition']
  }

  get stepId(): any {
    // @ts-ignore
    return this.openStep$.getValue()?.['id'];
  }

  get flowDefinition() {
    return this.flowDefinition$.getValue();
  }

  get nodes() {
    return this.flowDefinition?.nodes;
  }

  get flowId() {
    return this.activatedRoute.snapshot.queryParamMap.get('flowId')  || undefined;
  }

  public async ngOnInit() {
    this.flowService.getFlow(this.flowId).subscribe((res) => {
      if (res?.flow) {
        this.flowDefinition$.next(JSON.parse(res.flow));
      }

      this.loadingFinished$.next(true);
    });
  }

  onStepSelected(stepId: any) {
    this.selectedStep$.next(stepId);
  }

  onStepOpen(stepId: string) {
    const node = this.nodes?.find((node: any) => node.id === stepId);
    this.openStep$.next(node);
  }

  onScreenUpdated($event: any) {
    const definition = {...this.flowDefinition};
    const node = definition?.nodes.find((node: any) => node.id === $event.stepId);
    node.screenDefinition = $event.screenData;
    node.outputVariableFields = $event.outputVariableFields;
    this.flowDefinition$.next(definition);
  }

  onDefinitionUpdated(definition: any) {
    this.flowDefinition$.next(definition);
  }

  saveFlow(definition: any) {
    if (definition) {
      this.flowService.setFlow(JSON.stringify(definition), this.flowId).subscribe((res) => {
        console.log(res);
      });
    }
  }

  onOpenEditVariable(variableName: string) {
    const variable = this.flowDefinition$.getValue().variables.find((variable: any) => variable.name === variableName);
    this.openEditVariable$.next(variable);
  }

  onVariableUpdated(updatedVariable: any) {
    this.openEditVariable$.next(updatedVariable);
    const definition = {...this.flowDefinition};
    const index = definition?.variables.findIndex((variable: any) => variable.name === updatedVariable.name);
    if (index > -1) {
      definition.variables.splice(index, 1, updatedVariable);
    }

    this.flowDefinition$.next(definition);
  }

  onBackButtonClick() {
    this.openStep$.next(null);
    this.openEditVariable$.next(null);
  }
}
