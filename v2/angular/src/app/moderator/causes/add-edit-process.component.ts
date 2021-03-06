﻿import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import {AlertService, ProcessService, AccountService } from '@app/_services';

@Component({ templateUrl: 'add-edit-process.component.html' })
export class AddEditProcessComponent implements OnInit {
    form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;
    processes: any[];
    accounts: any[];

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private processService: ProcessService,
        private alertService: AlertService,
        private accountService: AccountService
    ) {}

    ngOnInit() {
        
        this.processService.getAllProcesses()
            .pipe(first())
            .subscribe(processes => this.processes = processes);

        this.accountService.getAll()
            .pipe(first())
            .subscribe(accounts => this.accounts = accounts);

        this.id = this.route.snapshot.params['id'];
        this.isAddMode = !this.id;
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            accountId : ['', Validators.required],
        });

        if (!this.isAddMode) {
            this.processService.getProcessById(this.id)
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
            this.createProcess();
        } else {
            this.updateProcess();
        }
    }

    private createProcess() {
        this.processService.createProcess(this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.alertService.success('Process created successfully', { keepAfterRouteChange: true });
                    this.router.navigate(['../'], { relativeTo: this.route });
                },
                error: error => {
                    this.alertService.error(error);
                    this.loading = false;
                }
            });
    }

    private updateProcess() {
        this.processService.updateProcess(this.id, this.form.value)
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