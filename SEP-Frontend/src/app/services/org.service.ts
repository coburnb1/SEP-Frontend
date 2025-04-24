import {effect, Injectable, signal} from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from "@angular/common/http";
import {Org} from "../models/org.model";
import {OrgResponse} from "../models/org-response.model";

@Injectable({
  providedIn: 'root'
})
export class OrgService {
  orgs = signal<Org[]>([]);
  availabilityByGroup = signal<Record<string, { day: string, start: string, end: string }[]>>({});


  constructor(private http: HttpClient, private router: Router) {
    const storedOrgs = localStorage.getItem('orgs');
    if (storedOrgs) {
      this.orgs.set(JSON.parse(storedOrgs));
    }

    effect(() => {
      localStorage.setItem('orgs', JSON.stringify(this.orgs()));
    });
  }

  getOrgsFromOrganizerId(organizerId: string) {
    this.http.get<OrgResponse>(`http://localhost:5010/api/orgs/${organizerId}/retrieve-all`).subscribe((response) => {
      console.log('ORG API RESPONSE:', response);

      if (Array.isArray(response)) {
        const current = this.orgs();
        const newOrgs: Org[] = [];

        for (const org of response) {
          const alreadyExists = current.some(o => o.id === org._id);
          if (!alreadyExists) {
            newOrgs.push({
              id: org._id,
              name: org.nanme, // 🤦‍♂️ yes, sir, we'll allow it
              organizerId: org.organizer_id,
              groupSize: org.group_size,
              attributeList: []
            });
          }
        }

        const updated = [...current, ...newOrgs];
        this.orgs.set(updated);
        localStorage.setItem('orgs', JSON.stringify(updated));
      } else {
        console.error('Unexpected response format for orgs');
      }
    });
  }

  clearOrgs() {
    this.orgs.set([]);
    localStorage.removeItem('orgs');
  }


  getGroupAvailability(orgId: string) {
    this.http.get<Record<string, { day: string, start: string, end: string }[]>>(
      `http://localhost:5010/api/orgs/${orgId}/get-groups-availability`
    ).subscribe((data) => {
      localStorage.setItem('org-availability', JSON.stringify(data));
    });
  }
}
