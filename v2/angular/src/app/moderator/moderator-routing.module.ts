import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubNavComponent } from './subnav.component';
import { LayoutComponent } from './layout.component';
import { OverviewComponent } from './overview.component';

const categoryModule = () => import('./causes/category.module').then(x => x.CategoryModule);
const processModule = () => import('./causes/process.module').then(x => x.ProcessModule);
const flowchartModule = () => import('../admin/flowchart/flowchart.module').then(x => x.FlowchartModel);
const routes: Routes = [
    { path: '', component: SubNavComponent, outlet: 'subnav' },
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', component: OverviewComponent },
            { path: 'processes', loadChildren: processModule },
            { path: 'categories', loadChildren: categoryModule },
            { path: 'flowchart', loadChildren: flowchartModule }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ModeratorRoutingModule { }