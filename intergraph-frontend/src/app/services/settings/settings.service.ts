import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  intergraphApiUrl: string;
  settingsCache: Observable<any>;
  filename: string;

  constructor(private http: HttpClient) {
    this.intergraphApiUrl = environment.apiUrl;
    this.settingsCache = null;
  }

  loadSettings(): Observable<any>   {
    const httpParams: HttpParams = new HttpParams();

    const options = {
      responseType: 'json' as const,
      params: httpParams
    };

    return this.http.get(this.intergraphApiUrl + '/settings', options);
  }

  getSettings(): Observable<any>
  {
    if (this.settingsCache == null)
    {
      console.log("Loading settings from server");
      // make a copy to settingsCache
      this.loadSettings().subscribe(data => this.settingsCache = new Observable(observer => observer.next(Object.assign({}, data))));
      return this.loadSettings();
    }
    else return this.settingsCache;
  }

  saveSettings(settings): Observable<any> {
    // cleanup: no ""
    Object.keys(settings).forEach(k => (!settings[k] && settings[k] !== undefined) && delete settings[k]);

    // update settingsCache
    this.settingsCache = new Observable(observer => observer.next(Object.assign({}, settings)));

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
