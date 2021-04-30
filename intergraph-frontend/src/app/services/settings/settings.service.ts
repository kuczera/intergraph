import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import * as cy from 'cytoscape';


@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  intergraphApiUrl: string;
  settings: Object;
  nodeClasses: string[];
  styleOptions: cy.StylesheetStyle[];

  constructor(private http: HttpClient) {
    this.intergraphApiUrl = environment.apiUrl;
    this.settings = null;
  }

  loadSettings(): Observable<any>   {
    const httpParams: HttpParams = new HttpParams();

    const options = {
      responseType: 'json',
      params: httpParams
    };

    return this.http.get(this.intergraphApiUrl + '/settings', options);
  }

  cacheSettings(settings) {
    this.settings = settings;
    this.createNodeClasses();
    this.createStyleOptions();
  }

  getNodeTypes()
  {
    var types = [];

    for (let key of Object.keys(this.settings)) {
      var splitted = key.split("-", 2);
      var type = splitted[0];
      if (types.indexOf(type) == -1)
        types.push(type);
    }
    return types;
  }

  createNodeClasses()
  {
    // create the nodeconfig object containing the pairs: type: title
    this.nodeClasses = [];
    for (let key of Object.keys(this.settings)) {
      var splitted = key.split("-", 2);
      var type = splitted[0];
      if (this.nodeClasses.indexOf(type) == -1)
        this.nodeClasses.push(type);
    }
  }

  createStyleOptions() {
    this.styleOptions =  [];
    this.styleOptions.push({
      selector: 'node',
      style: {
        'label': 'id',
        'text-wrap': 'ellipsis',
        'text-max-width': '150px',
      }
    });
    this.styleOptions.push({
      selector: 'edge',
      style: {
        'curve-style': 'bezier',
        'label': 'data(type)',
//      'edge-text-rotation': 'autorotate',  // This line makes the server fail compilation; but still works when the server is already running
        'font-size': 7,
        'text-background-color': 'white',
        'text-background-opacity': 1,
      }
    });

    for (var type of this.getNodeTypes())
    {
      var style: Object = {};
      style['shape'] = 'ellipse';
      if (this.settings[type+"-color"]!==undefined) style['background-color'] = this.settings[type+"-color"];
      if (this.settings[type+"-title"]===undefined) style['label'] = "";
      if (this.settings[type+"-title"]!==undefined) style['label'] = 'data('+this.settings[type+"-title"]+')';
      this.styleOptions.push({
        selector: '.'+type,
        style: style
      });
    }
    // in this order! selected last
    this.styleOptions.push({
      selector: ':selected',
      style: {
        'background-color': 'yellow',
      }
    });

  }

  getSettings(): Object {
    return this.settings;
  }

  getSetting(type: string, property: string)  {
//    console.log(this.settings[type + '-' + property]);
    return this.settings[type + '-' + property];
  }

  getNodeClasses(): string[] {
    return this.nodeClasses;
  }

  getStyleOptions(): cy.StylesheetStyle[] {
    return this.styleOptions;
  }

  saveSettings(settings): Observable<any> {
    // cleanup: no ""
    Object.keys(settings).forEach(k => (!settings[k] && settings[k] !== undefined) && delete settings[k]);

    // update settings cache
    this.cacheSettings(settings);

    // now save to server
    console.log("Saving settings to server");
    console.log(JSON.stringify(settings));
    const options = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
      })
    };

    return this.http.put(this.intergraphApiUrl + '/settings',JSON.stringify(settings), options);
  }
}
