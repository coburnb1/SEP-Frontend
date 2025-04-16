import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionFormComponent } from './submission-form.component';

describe('SubmissionFormComponent', () => {
  let component: SubmissionFormComponent;
  let fixture: ComponentFixture<SubmissionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmissionFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmissionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.submissionForm.get('attributes.interests')?.setValue([]);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should allow multiple interests to be selected', () => {
    const interestsControl = component.submissionForm.get('attributes.interests');
    interestsControl?.setValue(['Gaming', 'Cooking', 'Reading']);
    expect(interestsControl?.value).toEqual(['Gaming', 'Cooking', 'Reading']);
  });
});
