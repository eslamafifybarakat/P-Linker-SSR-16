import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { roots } from '../shared/configs/roots';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  apiUrl: string = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }
  getCountries(search?: any): Observable<any> {
    let params = new HttpParams();
    if (search) {
      params = params?.append("search", search);
    }
    return this.http?.get<any>(this.apiUrl + roots?.supplier?.getCountries, { params: params });
  }
  getCitiesByCountryId(CountryId: any): Observable<any> {
    let params = new HttpParams();
    if (CountryId) {
      params = params?.append("CountryId", CountryId);
    }
    return this.http?.get<any>(this.apiUrl + roots?.supplier?.getCitiesByCountryId, { params: params })
  }
}
