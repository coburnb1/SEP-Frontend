import {Component, effect, signal} from '@angular/core';

import { FormsModule } from '@angular/forms';import {HeaderComponent} from "../core/header/header.component";
import {FooterComponent} from "../core/footer/footer.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  organizationName: string = '';
  attributes = signal<{name: string; options: string[]}[]>([]);

  constructor() {
    effect(() => {
      console.log('this.organizationName: ', this.organizationName);
      console.log('this.attributes: ', this.attributes());
    });
  }

  addAttribute(): void {
    this.attributes.set([{ name: '', options: [] }]);
  }

  addOption(index: number): void {
    this.attributes()[index].options.push('');
  }

  // removeOption(index: number): void {
  //   this.attributes.splice(index, 1);
  // }

  removeAttribute(index: number): void {
    this.attributes().splice(index, 1);
  }
}
