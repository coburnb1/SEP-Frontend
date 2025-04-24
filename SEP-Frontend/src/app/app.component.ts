import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {FooterComponent} from "./pages/core/footer/footer.component";
import {HeaderComponent} from "./pages/core/header/header.component";
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent, FooterComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'NexTime';
  constructor(private titleService: Title) {
    this.titleService.setTitle('NexTime');
  }
}
