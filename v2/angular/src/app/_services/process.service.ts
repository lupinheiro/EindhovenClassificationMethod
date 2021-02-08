import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { Category } from '../_models/category';
import { Process } from '../_models/process';

const baseUrl = `${environment.apiUrl}/process`;

@Injectable({ providedIn: 'root' })
export class ProcessService {
    private processSubject: BehaviorSubject<Process>;
    private categorySubject: BehaviorSubject<Category>;
    public category: Observable<Category>;
    public process: Observable<Process>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.processSubject = new BehaviorSubject<Process>(null);
        this.process = this.processSubject.asObservable();
        this.categorySubject = new BehaviorSubject<Category>(null);
        this.category = this.categorySubject.asObservable();
    }

    public get processValue(): Process {
        return this.processSubject.value;
    }

    public get categoryValue(): Category {
        return this.categorySubject.value;
    }

    createProcess(process: Process) {
        return this.http.post(`${baseUrl}/createProcess`, process);
    }

    createCategory(category: Category) {
        return this.http.post(`${baseUrl}/createCategory`, category);
    }


    getAllProcesses() {
        return this.http.get<Process[]>(`${baseUrl}/getAllProcesses`);
    }

    getAllCategories() {
        return this.http.get<Category[]>(`${baseUrl}/getAllCategories`);
    }

    getProcessById(id: string) {
        return this.http.get<Process>(`${baseUrl}/getProcessById/${id}`);
    }

    getCategoryById(id: string) {
        return this.http.get<Category>(`${baseUrl}/getCategoryById/${id}`);
    }
    
    updateProcess(id, params) {
        return this.http.put(`${baseUrl}/updateProcess/${id}`, params)
            .pipe(map((process: any) => {
                // update the current account if it was updated
                if (process.id === this.processValue.id) {
                    // publish updated account to subscribers
                    process = { ...this.processValue, ...process };
                    this.processSubject.next(process);
                }
                return process;
            }));
    }

    updateCategory(id, params) {
        return this.http.put(`${baseUrl}/updateCategory/${id}`, params)
            .pipe(map((category: any) => {
                // update the current account if it was updated
                if (category.id === this.categoryValue.id) {
                    // publish updated account to subscribers
                    category = { ...this.categoryValue, ...category };
                    this.processSubject.next(category);
                }
                return category;
            }));
    }
    
    deleteProcess(id: string) {
        return this.http.delete(`${baseUrl}/deleteProcess/${id}`)
            .pipe(finalize(() => {
            }));
    }

    deleteCategory(id: string) {
        return this.http.delete(`${baseUrl}/deleteCategory/${id}`)
            .pipe(finalize(() => {
            }));
    }

}