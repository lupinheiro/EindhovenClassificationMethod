import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import {ProcessService } from '@app/_services';
import { Process } from '@app/_models';

@Component({ templateUrl: 'list-process.component.html' })
export class ListProcessComponent implements OnInit {
    processes: any[];

    constructor(private processService: ProcessService) {}

    ngOnInit() {
        this.processService.getAllProcesses()
            .pipe(first())
            .subscribe(processes => this.processes = processes);
    }

    deleteProcess(id: string) {
        const process = this.processes.find(x => x.id === id);
        process.isDeleting = true;
        this.processService.deleteProcess(id)
            .pipe(first())
            .subscribe(() => {
                this.processes = this.processes.filter(x => x.id !== id) 
            });
    }
    
}