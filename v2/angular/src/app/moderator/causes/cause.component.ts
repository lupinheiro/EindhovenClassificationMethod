import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import {ProcessService } from '../../_services';
import { Process } from '../../_models';

@Component({ templateUrl: 'cause.component.html' })
export class CauseComponent implements OnInit {
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