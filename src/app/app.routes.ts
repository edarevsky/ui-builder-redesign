import {Routes} from '@angular/router';
import {RunFlowComponent} from './run-flow/run-flow.component';
import {FlowBuilderComponent} from './flow-builder/flow-builder.component';

export const routes: Routes = [
  {
    path: 'build-flow', component: FlowBuilderComponent
  },
  {
    path: 'run-flow', component: RunFlowComponent
  },
  {path: '', redirectTo: '/build-flow', pathMatch: 'full'}
];
