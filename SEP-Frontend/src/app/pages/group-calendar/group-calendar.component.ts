import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  CalendarA11y,
  CalendarCommonModule, CalendarDateFormatter,
  CalendarDayModule,
  CalendarEvent, CalendarEventTitleFormatter,
  CalendarMonthModule, CalendarUtils,
  CalendarWeekModule,
  DateAdapter
} from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {CommonModule} from "@angular/common";
import {Subject} from "rxjs";


@Component({
  selector: 'app-group-calendar',
  standalone: true,
  imports: [
    CommonModule,
    CalendarCommonModule,
    CalendarWeekModule,
    CalendarDayModule,
    CalendarMonthModule,
  ],
  providers: [
    {
      provide: DateAdapter,
      useFactory: adapterFactory,
    },
    CalendarUtils,
    CalendarA11y,
    CalendarDateFormatter,
    CalendarEventTitleFormatter,
  ],
  templateUrl: './group-calendar.component.html',
  styleUrl: './group-calendar.component.scss'
})
export class GroupCalendarComponent implements OnInit, OnChanges {
  @Input() groupNumber?: number;
  @Input() comingFromOrg?: boolean;


  viewDate: Date = new Date();
  events: CalendarEvent[] = [];
  refresh$ = new Subject<void>();

  ngOnInit(): void {
    if (this.groupNumber !== undefined) {
      this.loadEventsFromLocalStorage(this.groupNumber);
    } else if (this.comingFromOrg) {
      this.showOrgFallback();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['groupNumber'] && this.groupNumber !== undefined) {
      this.loadEventsFromLocalStorage(this.groupNumber);
    } else if (changes['comingFromOrg'] && this.comingFromOrg) {
      this.showOrgFallback();
    }
  }

  private loadEventsFromLocalStorage(groupNumber: number): void {
    console.log('[LOAD EVENTS] Pulling group:', groupNumber);

    const raw = localStorage.getItem('groups');
    if (!raw) {
      console.warn('No groups found in localStorage');
      return;
    }

    let parsed: Record<string, any[]>;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      console.error('Failed to parse localStorage.groups', err);
      return;
    }

    const groupMembers = parsed[String(groupNumber)];
    if (!groupMembers) {
      console.warn(`No members for group ${groupNumber}`);
      return;
    }

    const dayMap: Record<string, number> = {
      Sunday: 0, Monday: 1, Tuesday: 2,
      Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6,
    };

    const newEvents: CalendarEvent[] = [];

    for (const respondent of groupMembers) {
      for (const slot of respondent.availability || []) {
        const today = new Date();
        const currentDay = today.getDay();
        const targetDay = dayMap[slot.day];

        const baseDate = new Date(today);
        baseDate.setHours(0, 0, 0, 0);

        const diff = targetDay - currentDay;

        // Snap to correct weekday in the same week
        baseDate.setDate(today.getDate() + diff);

        const [startHour, startMin] = slot.start.split(':').map(Number);
        const [endHour, endMin] = slot.end.split(':').map(Number);

        const start = new Date(baseDate);
        start.setHours(startHour, startMin, 0, 0);

        const end = new Date(baseDate);
        end.setHours(endHour, endMin, 0, 0);

        newEvents.push({
          start,
          end,
          title: respondent.name,
          color: {
            primary: '#1e90ff',
            secondary: '#D1E8FF'
          }
        });
      }
    }

    this.events = newEvents;
    this.refresh$.next();
    console.log('[CALENDAR EVENTS]', newEvents);
  }

  private showOrgFallback(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const nextMonday = new Date(today);
    const dayOffset = (1 - today.getDay()) % 7; // 1 = Monday
    nextMonday.setDate(today.getDate() + dayOffset);

    const start = new Date(nextMonday);
    start.setHours(10, 0, 0, 0);

    const end = new Date(nextMonday);
    end.setHours(11, 0, 0, 0);

    this.events = [{
      start,
      end,
      title: 'Group 2: Everyone is available!',
      color: {
        primary: '#ffc107',
        secondary: '#fff3cd'
      }
    }];

    this.refresh$.next();
    console.log('[ORG FALLBACK EVENT]', this.events);
  }
}

export interface GroupCalendarEvent extends CalendarEvent {
  respondentName: string;
}
