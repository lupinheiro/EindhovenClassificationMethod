import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListComponent } from './list-cause.component';
import { AddEditCauseComponent } from './add-edit-cause.component';

const routes: Routes = [
    { path: '', component: ListComponent },
    { path: 'add', component: AddEditCauseComponent },
    { path: 'edit/:id', component: AddEditCauseComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountsRoutingModule { }