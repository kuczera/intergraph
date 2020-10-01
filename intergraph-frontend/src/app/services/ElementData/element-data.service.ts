import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ElementDefinition} from 'cytoscape';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ElementDataService {

  intergraphApiUrl: string;

  constructor(private http: HttpClient) {
    this.intergraphApiUrl = environment.apiUrl;
  }

  getNode(id: string): Observable<any> {
    const httpParams: HttpParams = new HttpParams()
      .append('id', id);

    const options = {
      responseType: 'json' as const,
      params: httpParams
    };

    return this.http.get(
      this.intergraphApiUrl + '/getNode', options
    );
  }

  getRelations(id: string): Observable<any> {
    const httpParams: HttpParams = new HttpParams()
      .append('id', id);

    const options = {
      responseType: 'json' as const,
      params: httpParams
    };

    return this.http.get(
      this.intergraphApiUrl + '/getRelations', options
    );
  }

  getRelatedNodes(id: string): Observable<any> {
    const httpParams: HttpParams = new HttpParams()
      .append('id', id);

    const options = {
      responseType: 'json' as const,
      params: httpParams
    };

    return this.http.get(
      this.intergraphApiUrl + '/getRelatedNodes', options
    );
  }

  getRelatedNodesByType(id: string, type: string): Observable<any> {
    const httpParams: HttpParams = new HttpParams()
      .append('id', id)
      .append('type', type);

    const options = {
      responseType: 'json' as const,
      params: httpParams
    };

    return this.http.get(
      this.intergraphApiUrl + '/getRelatedNodesByType', options
    );
  }

  searchNodes(searchText: string): Observable<any> {
    const httpParams: HttpParams = new HttpParams()
      .append('searchText', searchText);

    const options = {
      responseType: 'json' as const,
      params: httpParams
    };

    return this.http.get(
      this.intergraphApiUrl + '/searchNodes', options
    );
  }

  getDatabaseLabels(): Observable<any> {
    const options = {
      responseType: 'json' as const
    };

    return this.http.get(
      this.intergraphApiUrl + '/getDatabaseLabels', options
    );
  }


}
