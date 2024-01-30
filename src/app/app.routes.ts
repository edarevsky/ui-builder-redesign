import { Routes } from '@angular/router';
import {RunFlowComponent} from './run-flow/run-flow.component';
import {SwdFlowComponent} from './swd-flow/swd-flow.component';

export const routes: Routes = [
  { path: 'build-flow', component: SwdFlowComponent },
  { path: 'run-flow', component: RunFlowComponent },
  { path: '',   redirectTo: '/build-flow', pathMatch: 'full' },
];
