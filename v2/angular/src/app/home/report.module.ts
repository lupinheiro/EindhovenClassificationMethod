import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { AddEditReportComponent } from './add-edit-report.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ReportRoutingModule
    ],
    declarations: [
        ReportComponent,
        AddEditReportComponent
    ]
})
export class ReportModule { }