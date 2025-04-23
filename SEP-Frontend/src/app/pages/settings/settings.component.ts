import {Component, effect} from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  constructor(userService: UserService){
    console.log(userService.user());
    effect(() => {
      console.log('from settings component ', userService.user());
    })
  }
}
