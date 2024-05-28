import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '@environments/environment';
import { Legend } from '@app/_models';

const baseUrl = `${environment.apiUrl}/legends`;

@Injectable({ providedIn: 'root' })
export class LegendService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<Legend[]> {
        return this.http.get<Legend[]>(baseUrl);
    }

    getById(id: string): Observable<Legend> {
        return this.http.get<Legend>(`${baseUrl}/${id}`);
    }

    getLegendTitle(title: string): Observable<Legend> {
        return this.http.get<Legend>(`${baseUrl}/legend/${title}`);
    }

    create(legend: Legend): Observable<Legend> {
        console.log('Creating legend:', legend);
        return this.http.post<Legend>(baseUrl, legend)
            .pipe(
                tap(response => console.log('Create response:', response)),
                catchError(error => {
                    console.error('Error in create request:', error);
                    return throwError(error);
                })
            );
    }

    addLegend(title: string, description: string, picture: string, date: Date): Observable<any> {
        const body = { title, description, picture, date };
        return this.http.post(baseUrl, body, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }

    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${baseUrl}/${id}`);
    }

    update(id: number, params: any): Observable<Legend> {
        return this.http.put<Legend>(`${baseUrl}/${id}`, params)
            .pipe(
                tap(() => console.log('Update successful')),
                catchError(error => {
                    console.log('Error updating legend:', error);
                    return throwError(error);
                })
            );
    }
    updateLegend(id: number, legend: Legend): Observable<any> {
        return this.http.put<any>(`${baseUrl}/${id}`, legend, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        });
    }
}
