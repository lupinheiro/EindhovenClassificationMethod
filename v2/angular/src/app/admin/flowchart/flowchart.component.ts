import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Modeler, OriginalPropertiesProvider, PropertiesPanelModule, InjectionNames, OriginalPaletteProvider} from "./bpmn-js";
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {BpmnModeler} from 'bpmn-js/lib/Modeler';

import { AccountService, AlertService } from '@app/_services';


@Component({
  selector: 'app-root',
  templateUrl: './flowchart.component.html',
  styleUrls: ['./flowchart.component.css']
})
export class AppComponent implements OnInit {
  title = 'Eindhoven Classification Model Flowchart';
  modeler;
  form: FormGroup;
    id: string;
    isAddMode: boolean;
    loading = false;
    submitted = false;

  constructor(private http: HttpClient, private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService) {
    
  }

  ngOnInit(): void {
    this.modeler = new Modeler({
      container: '#canvas',
      width: '100%',
      height: '600px',
    });
  }

  handleError(err: any) {
    if (err) {
      console.warn('Ups, error: ', err);
    }
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

