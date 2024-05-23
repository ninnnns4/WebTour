import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { FeedbackService, AlertService } from '@app/_services';
import { Feedback } from '@app/_models'; // Assuming Feedback model is defined in _models folder

@Component({ templateUrl: 'details.component.html' })
export class DetailsComponent implements OnInit {
    form: FormGroup;
    id: string;
    loading = false;
    submitted = false;
    isAddMode: boolean;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private feedbackService: FeedbackService,
        private alertService: AlertService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            message: ['', Validators.required],
            rating: ['', Validators.required],
        });

        if (!this.isAddMode) {
            this.feedbackService.getById(this.id)
                .pipe(first())
                .subscribe(feedback => {
                    this.form.patchValue(feedback);
                });
        }
    }

    // Convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // Reset alerts on submit
        this.alertService.clear();

        // Stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createFeedback();
        } else {
            this.updateFeedback();
        }
    }

    private createFeedback() {
        this.feedbackService.create(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Feedback created successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateFeedback() {
        this.feedbackService.update(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Feedback updated successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}
