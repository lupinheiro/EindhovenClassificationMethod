import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubNavComponent } from './subnav.component';
import { LayoutComponent } from './layout.component';
import { OverviewComponent } from './overview.component';

const causesModule = () => import('./causes/causes.module').then(x => x.CausesModule);
const flowchartModule = () => import('../admin/flowchart/flowchart.module').then(x => x.FlowchartModel);
const routes: Routes = [
    { path: '', component: SubNavComponent, outlet: 'subnav' },
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: OverviewComponent },
            { path: 'causes', loadChildren: causesModule },
            { path: 'flowchart', loadChildren: flowchartModule }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ModeratorRoutingModule { }