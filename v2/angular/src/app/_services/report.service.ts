import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Report } from '../_models/report';

const baseUrl = `${environment.apiUrl}/report`;

@Injectable({ providedIn: 'root' })
export class ReportService {
    private reportSubject: BehaviorSubject<Report>;
    public report: Observable<Report>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.reportSubject = new BehaviorSubject<Report>(null);
        this.report = this.reportSubject.asObservable();
    }

    public get reportValue(): Report {
        return this.reportSubject.value;
    }


    createReport(report: Report) {
        return this.http.post(`${baseUrl}/createReport`, report);
    }

   


    getAllReports() {
        return this.http.get<Report[]>(`${baseUrl}/getAllReports`);
    }

    

    getReportById(id: string) {
        return this.http.get<Report>(`${baseUrl}/getReportById/${id}`);
    }

   
    
    updateReport(id, params) {
        return this.http.put(`${baseUrl}/updateReport/${id}`, params)
            .pipe(map((report: any) => {
                // update the current account if it was updated
                if (report.id === this.reportValue.id) {
                    // publish updated account to subscribers
                    report = { ...this.reportValue, ...report };
                    this.reportSubject.next(report);
                }
                return report;
            }));
    }

   
    deleteReport(id: string) {
        return this.http.delete(`${baseUrl}/deleteReport/${id}`)
            .pipe(finalize(() => {
            }));
    }


}