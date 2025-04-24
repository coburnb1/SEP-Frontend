import { Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Respondent } from '../models/respondent.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  respondents = signal<Respondent[]>([]);
  groups = signal<Record<number, Respondent[]>>({});

  constructor(private http: HttpClient) {
    const storedRespondents = localStorage.getItem('respondents');
    const storedGroups = localStorage.getItem('groups');

    if (storedRespondents) {
      const parsed = JSON.parse(storedRespondents) as Respondent[];
      this.respondents.set(parsed);
    }

    if (storedGroups) {
      this.groups.set(JSON.parse(storedGroups));
    }

    effect(() => {
      localStorage.setItem('respondents', JSON.stringify(this.respondents()));
      localStorage.setItem('groups', JSON.stringify(this.groups()));
    });
  }

  getRespondents(orgId: string) {
    this.http.get<Respondent[]>(`http://localhost:5010/api/respondents/${orgId}/retrieve-all`)
      .subscribe((response) => {
        console.log('Respondents:', response);

        const uniqueById = new Map(response.map(r => [r._id, r]));
        const respondentArray = Array.from(uniqueById.values());

        const grouped: Record<number, Respondent[]> = {};
        for (const r of respondentArray) {
          const group = r.group_number;
          if (!grouped[group]) grouped[group] = [];
          grouped[group].push(r);
        }

        this.respondents.set(respondentArray);
        this.groups.set(grouped);
      });
  }

  clearAll() {
    this.respondents.set([]);
    this.groups.set({});
    localStorage.removeItem('respondents');
    localStorage.removeItem('groups');
  }
}
