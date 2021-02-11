import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '../_services';
import {ReportService} from '../_services/report.service';

@Component({ templateUrl: 'report.component.html' })
export class ReportComponent {
    account = this.accountService.accountValue;
    reports: any[];
    constructor(private accountService: AccountService, private reportService: ReportService) { }

    ngOnInit() {
        this.reportService.getAllReports()
            .pipe(first())
            .subscribe(reports => this.reports = reports);
    }

    deleteReport(id: string) {
        const report = this.reports.find(x => x.id === id);
        report.isDeleting = true;
        this.reportService.deleteReport(id)
            .pipe(first())
            .subscribe(() => {
                this.reports = this.reports.filter(x => x.id !== id) 
            });
    }
}