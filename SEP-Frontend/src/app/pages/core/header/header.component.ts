import {Component, effect} from '@angular/core';
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  loggedIn: Boolean = false;

  constructor(private userService: UserService) {
    effect(() => {
      if (this.userService.user().userID !== '') {
        this.loggedIn = true;
      }
    });
  }
}
