import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { roots } from '../shared/configs/roots';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl: string = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }
  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + roots.auth.login, data);
  }
}
