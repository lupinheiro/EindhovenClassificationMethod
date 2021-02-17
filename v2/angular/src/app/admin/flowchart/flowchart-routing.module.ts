import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './flowchart.component';

const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'flow', component: AppComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FlowRoutingModule { }