import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-variables',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './variables.component.html',
  styleUrl: './variables.component.scss'
})
export class VariablesComponent {

}
