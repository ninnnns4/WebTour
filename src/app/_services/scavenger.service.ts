import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { Scavenger } from '@app/_models';

const baseUrl = `${environment.apiUrl}/scavenger`;

@Injectable({ providedIn: 'root' })
export class ScavengerService {
    constructor(private http: HttpClient) {}

    getAllScavengers(): Observable<Scavenger[]> {
        return this.http.get<Scavenger[]>(baseUrl);
    }

    getById(id: string): Observable<Scavenger> {
        return this.http.get<Scavenger>(`${baseUrl}/${id}`);
    }

    create(scavengerData: FormData) {
        return this.http.post(`${environment.apiUrl}/scavenger`, scavengerData);
    }

    update(id: string, scavengerData: FormData) {
        return this.http.put(`${environment.apiUrl}/scavenger/${id}`, scavengerData);
    }

    deleteScavenger(id: string): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`);
    }
}
