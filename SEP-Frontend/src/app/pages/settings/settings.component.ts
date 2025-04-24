import {Component} from '@angular/core';
import {User} from "../../models/user.model";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  name?: string;
  email?: string;

  constructor() {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      const user: User = JSON.parse(storedUser);

      if (user.userID !== '') {
        this.name = user.name;
        this.email = user.email;
      }
    }
  }
}
