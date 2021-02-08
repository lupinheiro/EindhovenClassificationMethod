import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListProcessComponent } from './list-process.component';
import { AddEditProcessComponent } from './add-edit-process.component';


const routes: Routes = [
    { path: '', component: ListProcessComponent },
    { path: 'processes', component: ListProcessComponent },
    { path: 'addProcess', component: AddEditProcessComponent },
    { path: 'editProcess/:id', component: AddEditProcessComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProcessRoutingModule { }