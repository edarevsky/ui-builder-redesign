import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {GojsFlowComponent} from './gojs-flow/gojs-flow.component';
import {SwdFlowComponent} from './swd-flow/swd-flow.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, GojsFlowComponent, SwdFlowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'redesign';

  ngOnInit() {
    console.log('hello world');
  }
}
