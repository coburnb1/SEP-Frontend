import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class GroupService {

  constructor(private http: HttpClient) {}

  createGroup(id: string, group: any) {
    this.http.post(`http://localhost:5000/api/orgs/${id}/get-groups`, group);
  }

  getAllGroups() {

  }
}
