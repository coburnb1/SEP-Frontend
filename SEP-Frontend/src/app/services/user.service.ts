import {effect, Injectable, signal} from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {UserResponse} from "../models/user-response.model";
import {User} from "../models/user.model";
import {OrgService} from "./org.service";
import {GroupService} from "./group.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedIn: Boolean = false;
  user = signal<User>({
    userID: '',
    email: '',
    name: '',
    organizations: []
  })
  constructor(private http: HttpClient, private router: Router, orgService: OrgService,
              groupService: GroupService,) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user.set(JSON.parse(storedUser));
      this.loggedIn = true;
    }

    effect(() => {
      const userVal = this.user();
      if (userVal.userID !== '') {
        localStorage.setItem('user', JSON.stringify(userVal));
        orgService.getOrgsFromOrganizerId(userVal.userID);
      }
    });
    effect(() => {
      const userVal = this.user();
      const orgs = orgService.orgs();

      if (userVal.userID !== '' && orgs.length && groupService.respondents().length === 0) {
        const firstOrg = orgs[0]; // or pick dynamically
        groupService.getRespondents(firstOrg.id);
      }
    });
  }

  login(email: string, password: string)  {
    this.http.post<UserResponse>(`http://localhost:5010/api/organizers/retrieve`, {"email": email, "password": password}).subscribe((response) => {
      if (response) {
        console.log('response', response);
        this.loggedIn = true;
        if (response._id) {
          this.user.set({
            userID: response._id,
            email: response.email,
            name: response.name,
            organizations: response.organization_ids
          })
        }
        this.router.navigate(['/home']);
      }
      else {
        console.log('wrong email or password');
      }
    });
  }

  logout() {
    this.user.set({
      userID: '',
      email: '',
      name: '',
      organizations: []
    });
    localStorage.removeItem('user');
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }
}
