import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {SwdFlowComponent} from './swd-flow/swd-flow.component';
import {MatTabLink, MatTabNav, MatTabNavPanel} from '@angular/material/tabs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SwdFlowComponent, MatTabNav, MatTabLink, RouterLink, RouterLinkActive, MatTabNavPanel],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'redesign';

  ngOnInit() {
    console.log('hello world');
  }
}
