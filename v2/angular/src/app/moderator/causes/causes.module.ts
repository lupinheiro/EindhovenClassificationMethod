import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './causes-routing.module';
import { ListComponent } from './list-cause.component';
import { AddEditCauseComponent } from './add-edit-cause.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountsRoutingModule
    ],
    declarations: [
        ListComponent,
        AddEditCauseComponent
    ]
})
export class CausesModule { }