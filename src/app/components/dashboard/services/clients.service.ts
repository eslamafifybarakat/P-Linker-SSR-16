import { environment } from './../../../../environments/environment';
import { HttpParams, HttpClient } from '@angular/common/http';
import { roots } from './../../../shared/configs/roots';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl: string = environment?.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getUsersList(page?: number, per_page?: number, search?: string, sort?: any, conditions?: any): Observable<any> {
    let params = new HttpParams();
    if (page) {
      params = params?.append("page", page);
    }
    if (per_page) {
      params = params?.append("per_page", per_page);
    }
    if (search) {
      params = params?.append("search", search);
    }
    if (sort && Object.keys(sort)?.length > 0) {
      params = params?.append("sort", JSON?.stringify(sort));
    }
    if (conditions && conditions?.length > 0) {
      params = params?.append("conditions", JSON?.stringify(conditions));
    }
    return this.http?.get(`${this.baseUrl}/${roots?.dashboard?.users.getUsers}`, { params: params });
  }
  addUser(data: any): Observable<any> {
    return this.http?.post(`${this.baseUrl}/${roots?.dashboard?.users.addUser}`, data);
  }
  editUser(data: any, id: number | string): Observable<any> {
    return this.http?.put(`${this.baseUrl}/${roots?.dashboard?.users.editUser}/${id}`, data);
  }
  getUserById(id: any): Observable<any> {
    return this.http?.get(`${this.baseUrl}/${roots?.dashboard?.users.getSingleUser}/${id}`);
  }
  deleteUserById(id: number, data: any): Observable<any> {
    let params = new HttpParams();
    if (data?.name) {
      params = params.append("name", data?.name);
    }
    return this.http.delete<any>(`${this.baseUrl}${roots?.dashboard.users.deleteUsers}/delete/` + id, { params: params });
  }
}
