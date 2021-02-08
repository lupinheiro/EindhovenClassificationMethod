import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProcessRoutingModule } from './process-routing.module';
import { ListProcessComponent } from './list-process.component';
import { AddEditProcessComponent } from './add-edit-process.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProcessRoutingModule
    ],
    declarations: [
        ListProcessComponent,
        AddEditProcessComponent
    ]
})
export class ProcessModule { }