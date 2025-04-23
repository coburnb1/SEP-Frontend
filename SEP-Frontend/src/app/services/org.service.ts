import {effect, Injectable, signal} from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Org} from "../models/org.model";
import {OrgResponse} from "../models/org-response.model";

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  orgs = signal<Org[]>([])
  constructor(private http: HttpClient, private router: Router) {
    effect(() => {

    });
  }

  getOrgsFromOrganizerId(organizerId: string)  {
    this.http.get<OrgResponse>(`http://localhost:5010/api/orgs/${organizerId}/retrieve-all`).subscribe((response) => {
      if (response) {
        console.log('response', response);
        if (response._id) {
          this.orgs().push({
            id: response._id,
            name: response.nanme,
            organizerId: response.organizer_id,
            groupSize: response.group_size,
            attributeList: []
          })
        }
      }
      else {
        console.log('could not get orgs');
      }
    });
  }
}
