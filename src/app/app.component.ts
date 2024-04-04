import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {SwdFlowComponent} from './swd-flow/swd-flow.component';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';
import {FlowService} from './services/flow.service';
import {FlowDataService} from './services/flow-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SwdFlowComponent, MatTabNav, MatTabLink, RouterLink, RouterLinkActive, MatTabNavPanel],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private activatedRoute: ActivatedRoute, private flowDataService: FlowDataService) {}
}
