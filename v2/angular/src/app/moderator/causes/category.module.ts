import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { ListCategoryComponent } from './list-category.component';
import { AddEditCategoryComponent } from './add-edit-category.component';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CategoryRoutingModule
    ],
    declarations: [
        ListCategoryComponent,
        AddEditCategoryComponent
    ]
})
export class CategoryModule { }