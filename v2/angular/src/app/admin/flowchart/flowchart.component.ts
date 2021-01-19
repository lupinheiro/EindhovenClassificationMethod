import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.css']
})
export class AppComponent {
  title = 'bpmn-js-angular';
<<<<<<< HEAD
  diagramUrl = 'https://github.com/lupinheiro/EindhovenClassificationMethod/blob/f92c159043523c2236197af67d57dfb0a002a68c/v2/angular/src/app/admin/flowchart/diagram-2.bpmn';
=======
  diagramUrl = 'v2/angular/src/app/admin/flowchart/diagram-2.bpmn'; 
>>>>>>> flowchart
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
