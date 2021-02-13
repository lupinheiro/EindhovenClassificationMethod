import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import {AlertService, ProcessService, AccountService} from '../_services';
import {ReportService } from '../_services/report.service';

@Component({ templateUrl: 'add-edit-report.component.html' })
export class AddEditReportComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    categories: any[];
    reports: any[];
    processes: any[];
    account = this.accountService.accountValue;
    numbers: [1,2];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private processService: ProcessService,
        private alertService: AlertService,
        private reportService: ReportService,
        private accountService: AccountService
    ) {}

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;

        this.processService.getAllCategories()
            .pipe(first())
            .subscribe(categories => this.categories = categories);

        this.reportService.getAllReports()
            .pipe(first())
            .subscribe(reports => this.reports = reports);

        this.processService.getAllProcesses()
            .pipe(first())
            .subscribe(processes => this.processes = processes);

        this.form = this.formBuilder.group({
            accountId: ['', Validators.required],
            type: ['', Validators.required],
            code:['', Validators.required],
            reportText: ['', Validators.required],
        });

        if (!this.isAddMode) {
            this.reportService.getReportById(this.id)
                .pipe(first())
                .subscribe(x => this.form.patchValue(x));
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createReport();
        } else {
            this.updateReport();
        }
    }

    private createReport() {
        this.reportService.createReport(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Report created successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateReport() {
        this.reportService.updateReport(this.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Update successful', { keepAfterRouteChange: true });
                    this.router.navigate(['../../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }
}