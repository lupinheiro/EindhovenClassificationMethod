import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.css']
})
export class AppComponent {
  title = 'bpmn-js-angular';
  diagramUrl = 'v2/angular/src/app/admin/flowchart/diagram-2.bpmn'; 
  importError?: Error;

  handleImported(event) {

    const {
      type,
      error,
      warnings
    } = event;

    if (type === 'success') {
      console.log(`Rendered diagram (%s warnings)`, warnings.length);
    }

    if (type === 'error') {
      console.error('Failed to render diagram', error);
    }

    this.importError = error;
  }

}
