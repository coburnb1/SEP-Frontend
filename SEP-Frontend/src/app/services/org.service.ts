import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class OrgService {

  constructor(private http: HttpClient) {}

  createOrganization(id: string, organization: any) {
    this.http.post(`http://localhost:5000/api/orgs/${id}`, organization);
  }

  getAllOrgs() {

  }
}
