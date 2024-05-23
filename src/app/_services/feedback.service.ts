import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Feedback } from '@app/_models';

const baseUrl = `${environment.apiUrl}/feedbacks`;

@Injectable({ providedIn: 'root' })
export class FeedbackService {
    private feedbackSubject: BehaviorSubject<Feedback>;
    public feedback: Observable<Feedback>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.feedbackSubject = new BehaviorSubject<Feedback>(null);
        this.feedback = this.feedbackSubject.asObservable();
    }

    public get feedbackValue(): Feedback {
        return this.feedbackSubject.value;
    }

    getAll() {
        return this.http.get<Feedback[]>(baseUrl);
    }

    getById(id: string) {
        return this.http.get<Feedback>(`${baseUrl}/${id}`);
    }
    
    create(params) {
        return this.http.post(baseUrl, params);
    }
    
    update(id, params) {
        return this.http.put(`${baseUrl}/${id}`, params)
            .pipe(map((feedback: any) => {
                // update the current account if it was updated
                if (feedback.id === this.feedbackValue.id) {
                    // publish updated account to subscribers
                    feedback = { ...this.feedbackValue, ...feedback };
                    this.feedbackSubject.next(feedback);
                }
                return feedback;
            }));
    }
    
    delete(id: string) {
        return this.http.delete(`${baseUrl}/${id}`)
            .pipe(finalize(() => {
            }));
    }
}