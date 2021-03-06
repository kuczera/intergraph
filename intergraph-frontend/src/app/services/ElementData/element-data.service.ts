import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {ElementDefinition} from 'cytoscape';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {IFilterLabel} from '../../filter-label';

@Injectable({
  providedIn: 'root'
})
export class ElementDataService {

  intergraphApiUrl: string;
  restApiName: string;

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

  getKeys(type: string): Observable<any> {
    const httpParams: HttpParams = new HttpParams()
      .append('type', type);

    const options = {
      responseType: 'json' as const,
      params: httpParams
    };

    return this.http.get(
      this.intergraphApiUrl + '/getKeys', options
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

  searchNodes(filter: string, property: string, searchText: string): Observable<any> {

    if (filter === 'Any') {
      this.restApiName = '/searchNodes';
    } else {
      this.restApiName = '/searchNodesByType';
    }

    const httpParams: HttpParams = new HttpParams()
      .append('searchText', searchText.toLowerCase())
      .append('filter', filter)
      .append('property', property);

    const options = {
      responseType: 'json' as const,
      params: httpParams
    };

    return this.http.get(
      this.intergraphApiUrl + this.restApiName, options
    );
  }

  getDatabaseLabels(): Observable<IFilterLabel[]> {
    const httpParams: HttpParams = new HttpParams();
    const options = {
      responseType: 'json' as const,
      params: httpParams
    };
    return this.http.get<IFilterLabel[]>(
      this.intergraphApiUrl + '/getDatabaseLabels', options
    );
  }

  getDatabaseLabelCount(): Observable<any> {
    const httpParams: HttpParams = new HttpParams();
    const options = {
      responseType: 'json' as const,
      params: httpParams
    };
    return this.http.get(
      this.intergraphApiUrl + '/getDatabaseLabelCount', options
    );
  }


  getAllDates(): Observable<any> {

    const httpParams: HttpParams = new HttpParams();

    const options = {
      responseType: 'json' as const,
      params: httpParams
    };

    return this.http.get(
      this.intergraphApiUrl + '/getAllDates', options
    );
  }


}
