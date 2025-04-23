import {effect, Injectable, signal} from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {UserResponse} from "../models/user-response.model";
import {User} from "../models/user.model";
import {OrgService} from "./org.service";

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
  constructor(private http: HttpClient, private router: Router, orgService: OrgService) {
    effect(() => {
      if (this.user().userID !== '') {
        orgService.getOrgsFromOrganizerId(this.user().userID)
        console.log(orgService.orgs())
      }
    })
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
}
