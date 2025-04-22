import { Component, signal } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {RouterLink} from "@angular/router";
import {CalendarComponent} from '../core/calendar/calendar.component';

@Component({
  selector: 'app-organization-page',
  standalone: true,
  imports: [FormsModule, RouterLink, CalendarComponent],
  templateUrl: './organization-page.component.html',
  styleUrl: './organization-page.component.scss'
})
export class OrganizationPageComponent {
  isButtonVisible: boolean = false;

  showButton() {
    this.isButtonVisible = true;
  }
  name = signal<string>('SEP Frontend Team');
  organizationName: string = '';
  attributes: { name: string; options: string[] }[] = [];

  addAttribute(): void {
    this.attributes.push({ name: '', options: [] });
  }

  addOption(index: number): void {
    this.attributes[index].options.push('');
  }

  // removeOption(index: number): void {
  //   this.attributes.splice(index, 1);
  // }

  removeAttribute(index: number): void {
    this.attributes.splice(index, 1);
  }
}
