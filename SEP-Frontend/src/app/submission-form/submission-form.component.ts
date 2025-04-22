import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-submission-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './submission-form.component.html',
  styleUrl: './submission-form.component.scss'
})
export class SubmissionFormComponent implements OnInit {
  submissionForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.submissionForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      availability: this.fb.group({
        monday: [false],
        tuesday: [false],
        wednesday: [false],
        thursday: [false],
        friday: [false]
      }),
      attributes: this.fb.group({
        class: ['', Validators.required],
        interests: [[]]
      })
    });
  }

  onSubmit(): void {
    console.log(this.submissionForm.value);
  }
}
