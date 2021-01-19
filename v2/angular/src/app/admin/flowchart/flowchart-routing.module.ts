import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './flowchart.component';
import { DiagramComponent } from './diagram/diagram.component';

const routes: Routes = [
    { path: '', component: AppComponent },
    { path: 'flow', component: DiagramComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FlowRoutingModule { }