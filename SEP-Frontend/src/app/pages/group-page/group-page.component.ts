import {Component, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import { Group } from "../../models/group.model"
import {GroupCalendarComponent} from "../group-calendar/group-calendar.component";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-group-page',
  standalone: true,
  imports: [CommonModule, GroupCalendarComponent, GroupCalendarComponent], //MemberPageComponent
  templateUrl: './group-page.component.html',
  styleUrl: './group-page.component.scss',
  inputs: ['groupNumber']
})
export class GroupPageComponent implements OnInit {
  groupNumber!: number;

  groupMembers: { name: string }[] = [];
  isLoading = false;
  error: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const param = params.get('groupNumber');
      if (param) {
        this.groupNumber = +param;
        console.log('[ROUTE] groupNumber:', this.groupNumber);
      }
    });

    const raw = localStorage.getItem('groups');
    const groupNumberStr = this.route.snapshot.paramMap.get('groupNumber');
    this.groupNumber = Number(groupNumberStr);

    if (raw && this.groupNumber) {
      const parsed: Record<string, any[]> = JSON.parse(raw);
      this.groupMembers = parsed[String(this.groupNumber)] || [];
      console.log('[GROUP MEMBERS]', this.groupMembers);
    }
  }

  refreshData(): void {
    this.isLoading = true;
    this.error = null;
  }
}

