import {Component, signal} from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';import {HeaderComponent} from "../core/header/header.component";
import {FooterComponent} from "../core/footer/footer.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
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
