import { Component } from '@angular/core';
import {VariableDesignerComponent} from '../variable-designer/variable-designer.component';

@Component({
  selector: 'app-variable-popover',
  standalone: true,
  imports: [
    VariableDesignerComponent
  ],
  templateUrl: './variable-popover.component.html',
  styleUrl: './variable-popover.component.scss'
})
export class VariablePopoverComponent {

}
