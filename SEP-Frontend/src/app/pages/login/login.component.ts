import { Component } from '@angular/core';
import {FormsModule } from "@angular/forms";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  email?: string;
  password?: string;

  constructor(private userService: UserService) { }

  login() {
    this.userService.login(this.email!, this.password!);
  }
}
