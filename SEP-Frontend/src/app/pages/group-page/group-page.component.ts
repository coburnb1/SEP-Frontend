import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-group-page',
  standalone: true,
  imports: [],
  templateUrl: './group-page.component.html',
  styleUrl: './group-page.component.scss'
})
export class GroupPageComponent {
  constructor(private userService: UserService) {}

  //currentUserList: UserModel[] = this.userService.getAllUsers() ?? [];
}
