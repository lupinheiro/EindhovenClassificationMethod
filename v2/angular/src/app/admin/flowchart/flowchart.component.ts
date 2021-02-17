import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import Modeler from "bpmn-js/lib/Modeler";
import propertiesPanelModule from "bpmn-js-properties-panel";
import propertiesProviderModule from "bpmn-js-properties-panel/lib/provider/camunda";

import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";
import "bpmn-js-properties-panel/dist/assets/bpmn-js-properties-panel.css";

import { first } from 'rxjs/operators';

import * as camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda.json';


@Component({
  selector: 'app-root',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.css']
})
export class AppComponent implements OnInit {
  title = 'Eindhoven Classification Method';
  modeler: Modeler;

  @ViewChild('canvas')
  private canvesRef: ElementRef;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.modeler = new Modeler({
      container: '#canvas',
      width: '100%',
      height: '600px',
      propertiesPanel: {
        parent: '#properties'
      },
      additionalModules: [
        propertiesPanelModule,
        propertiesProviderModule
      ],
      moddleExtensions: {
        camunda: camundaModdleDescriptor
      }
    });
    this.load();
  }


  handleError(err: any) {
    if (err) {
      console.warn('Ups, error: ', err);
    }
  }

  public getExample(): Observable<string> {
    const url = '/assets/bpmn/initial.bpmn'; // local
    return this.http.get(url, {responseType: 'text'});
  }



  load(): void {
    const url = 'https://cdn.statically.io/gh/lupinheiro/EindhovenClassificationMethod/main/v2/angular/src/app/admin/flowchart/diagram-2.bpmn';
   
    this.http.get(url, { responseType: 'text' }) 
    .pipe(first())
    .subscribe(
      (x: any) => {
        console.log('Fetched XML, now importing: ', x);
        this.modeler.importXML(x, this.handleError);
      },
    );
  }
  

  setEncoded(link, name, data) {
    var encodedData = encodeURIComponent(data);

    if (data) {
      link.addClass('active').attr({
        'href': 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData,
        'download': name
      });
    } else {
      link.removeClass('active');
    }
  }

  save(): void {
    this.modeler.saveXML((err: any, xml: any) => 
    console.log('Result of saving XML: ', err, xml)
    );
  }
}

