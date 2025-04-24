import { Component, effect, signal } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Org } from '../../../models/org.model';
import {DecimalPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    DecimalPipe,
    NgForOf
  ],
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  orgs = signal<Org[]>([]);

  constructor(private userService: UserService) {
    effect(() => {
      const user = this.userService.user();
      if (user.userID !== '') {

        const storedOrgs = localStorage.getItem('orgs');
        if (storedOrgs) {
          this.orgs.set(JSON.parse(storedOrgs));
        }
      }
    });
  }
}
