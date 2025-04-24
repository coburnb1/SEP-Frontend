import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GroupCalendarComponent } from '../group-calendar/group-calendar.component';
import { OrgService } from '../../services/org.service';

@Component({
  selector: 'app-organization-page',
  standalone: true,
  imports: [FormsModule, RouterLink, GroupCalendarComponent],
  templateUrl: './organization-page.component.html',
  styleUrl: './organization-page.component.scss'
})
export class OrganizationPageComponent implements OnInit {
  name = signal<string>('SEP Frontend Team');
  organizationName: string = '';
  isButtonVisible = false;
  attributes: { name: string; options: string[] }[] = [];
  orgId: string = '';
  sharedAvailability: { day: string; start: string; end: string }[] | null = null;

  constructor(
    private route: ActivatedRoute,
    public orgService: OrgService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('orgId');
      if (id) {
        this.orgId = id;
        this.orgService.getGroupAvailability(id);
        // Delay loading from localStorage to ensure the async call had time to write
        setTimeout(() => {
          const raw = localStorage.getItem('org-availability');
          if (raw) {
            try {
              const parsed = JSON.parse(raw);
              this.sharedAvailability = parsed["2"] || []; // Example fallback to group "2"
              console.log('[ORG PAGE] Shared availability:', this.sharedAvailability);
            } catch (e) {
              console.error('Failed to parse org-availability from localStorage:', e);
            }
          }
        }, 300);
      }
    });
  }

  showButton() {
    this.isButtonVisible = true;
  }

  addAttribute(): void {
    this.attributes.push({ name: '', options: [] });
  }

  addOption(index: number): void {
    this.attributes[index].options.push('');
  }

  removeAttribute(index: number): void {
    this.attributes.splice(index, 1);
  }

  protected readonly localStorage = localStorage;
}
