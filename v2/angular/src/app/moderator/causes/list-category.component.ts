import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import {ProcessService } from '@app/_services';
import { Process } from '@app/_models';

@Component({ templateUrl: 'list-category.component.html' })
export class ListCategoryComponent implements OnInit {
    categories: any[];

    constructor(private processService: ProcessService) {}

    ngOnInit() {
        this.processService.getAllCategories()
            .pipe(first())
            .subscribe(categories => this.categories = categories);
    }

    deleteCategory(id: string) {
        const category = this.categories.find(x => x.id === id);
        category.isDeleting = true;
        this.processService.deleteCategory(id)
            .pipe(first())
            .subscribe(() => {
                this.categories = this.categories.filter(x => x.id !== id) 
            });
    }
    
}