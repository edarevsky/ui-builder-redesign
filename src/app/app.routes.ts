import {Routes} from '@angular/router';
import {RunFlowComponent} from './run-flow/run-flow.component';
import {FlowBuilderComponent} from './flow-builder/flow-builder.component';
import {UiBuilderCustomComponent} from './ui-builder-custom/ui-builder-custom.component';
import {VariableDesignerComponent} from './variable-designer/variable-designer.component';

export const routes: Routes = [
  {
    path: 'build-flow', component: FlowBuilderComponent,
    children: [
      {path: 'edit-variable', component: VariableDesignerComponent},
      {path: 'ui-builder', component: UiBuilderCustomComponent}
    ]
  },
  {path: 'run-flow', component: RunFlowComponent},
  {path: '', redirectTo: 'build-flow', pathMatch: 'full'}
];
