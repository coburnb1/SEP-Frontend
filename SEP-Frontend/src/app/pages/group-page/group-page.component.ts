import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import {CommonModule} from "@angular/common";
import { Group } from "../../models/group.model"


@Component({
  selector: 'app-group-page',
  standalone: true,
  imports: [CommonModule], //MemberPageComponent
  templateUrl: './group-page.component.html',
  styleUrl: './group-page.component.scss'
})
export class GroupPageComponent{
  groups: Group[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.refreshData();
  }

  refreshData(): void {
    this.isLoading = true;
    this.error = null;

    this.http.get<Group[]>('http://localhost:5000/api/orgs/67f7f02d26841fb83f05f3a3/retrieve') //67f7f02d26841fb83f05f3a3
      .pipe(
        catchError(error => {
          this.error = 'Failed to load groups. Please try again later.';
          console.error('Error loading groups:', error);
          return of([]);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(data => {
        this.groups = data;
      });
    console.log(this.groups);
  }
}


  //currentUserList: UserModel[] = this.userService.getAllUsers() ?? [];

