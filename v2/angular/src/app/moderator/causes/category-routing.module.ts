import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCategoryComponent } from './list-category.component';
import { AddEditCategoryComponent } from './add-edit-category.component';


const routes: Routes = [
    { path: '', component: ListCategoryComponent },
    { path: 'categories', component: ListCategoryComponent },
    { path: 'addCategory', component: AddEditCategoryComponent },
    { path: 'editCategory/:id', component: AddEditCategoryComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CategoryRoutingModule { }