import {HttpClient} from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {Modeler, OriginalPropertiesProvider, PropertiesPanelModule, InjectionNames, OriginalPaletteProvider} from "./bpmn-js";
import {CustomPropsProvider} from './CustomPropsProvider';
import {CustomPaletteProvider} from "./CustomPaletteProvider";
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountService, AlertService } from '@app/_services';

const customModdle = {
  name: "customModdle",
  uri: "https://github.com/lupinheiro/EindhovenClassificationMethod",
  prefix: "custom",
  xml: {
    tagAlias: "lowerCase"
  },
  associations: [],
  types: [
    {
      "name": "ExtUserTask",
      "extends": [
        "bpmn:UserTask"
      ],
      "properties": [
        {
          "name": "worklist",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
  ]
};

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
      additionalModules: [
        PropertiesPanelModule,

        // Re-use original bpmn-properties-module, see CustomPropsProvider
        {[InjectionNames.bpmnPropertiesProvider]: ['type', OriginalPropertiesProvider.propertiesProvider[1]]},
        {[InjectionNames.propertiesProvider]: ['type', CustomPropsProvider]},

        // Re-use original palette, see CustomPaletteProvider
        {[InjectionNames.originalPaletteProvider]: ['type', OriginalPaletteProvider]},
        {[InjectionNames.paletteProvider]: ['type', CustomPaletteProvider]},
      ],
      propertiesPanel: {
        parent: '#properties'
      },
      moddleExtension: {
        custom: customModdle
      }
    });
  }

  handleError(err: any) {
    if (err) {
      console.warn('Ups, error: ', err);
    }
  }

  load(): void {
    const url = 'https://cdn.staticaly.com/gh/lupinheiro/EindhovenClassificationMethod/f92c159043523c2236197af67d57dfb0a002a68c/v2/angular/src/app/admin/flowchart/diagram-2.bpmn';
   
    this.http.get(url, { responseType: 'text' }) 
    .pipe(first())
    .subscribe(
      (x: any) => {
        console.log('Fetched XML, now importing: ', x);
        this.modeler.importXML(x, this.handleError);
      },
    );
  }

  save(): void {
    this.modeler.saveXML((err: any, xml: any) => console.log('Result of saving XML: ', err, xml));
  }
}

