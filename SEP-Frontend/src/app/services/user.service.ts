import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedIn: Boolean = false;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string)  {
    this.http.post(`http://localhost:5010/api/organizers/retrieve`, {"email": email, "password": password}).subscribe((response) => {
      if (response) {
        console.log('response', response);
        this.loggedIn = true;
        this.router.navigate(['/home']);
      }
      else {
        console.log('wrong email or password');
      }
    });
  }
}
