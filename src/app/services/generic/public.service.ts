import { roots } from './../../shared/configs/roots';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from './../../../environments/environment';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { keys } from './../../shared/configs/localstorage-key';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  private readonly baseUrl = environment?.apiUrl

  showGlobalLoader = new Subject<boolean>()
  showSearchLoader = new Subject<boolean>()
  resetTable = new BehaviorSubject<boolean>(false)
  changePageSub = new BehaviorSubject<{}>({})

  // ====Start Employees and Vehicles actions=========
  isLoadingEmployees = new BehaviorSubject<boolean>(false)
  isLoadingSearchEmployees = new BehaviorSubject<boolean>(false)
  employeesLength = new BehaviorSubject<{}>(null)
  addEmployeeItem = new BehaviorSubject<boolean>(false)
  resetEmployeesData = new BehaviorSubject<boolean>(false)
  filterEmployeesData = new BehaviorSubject<boolean>(false)
  searchEmployeesData = new BehaviorSubject<{}>(null)
  toggleFilterEmployeeDataType = new BehaviorSubject<{}>(null)

  isLoadingVehicles = new BehaviorSubject<boolean>(false)
  isLoadingSearchVehicles = new BehaviorSubject<boolean>(false)
  VehicleLength = new BehaviorSubject<{}>(null)
  addVehicleItem = new BehaviorSubject<boolean>(false)
  resetVehiclesData = new BehaviorSubject<boolean>(false)
  filterVehiclesData = new BehaviorSubject<boolean>(false)
  searchVehiclesData = new BehaviorSubject<{}>(null)
  toggleFilterVehicleDataType = new BehaviorSubject<{}>(null)
  // ====End Employees and Vehicles actions=========

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private translate: TranslateService,
    private http: HttpClient
  ) { }

  getCurrentLanguage(): string | any {
    if (isPlatformBrowser(this.platformId)) {
      return window?.localStorage?.getItem(keys?.language);
    }
  }
  translateTextFromJson(text: string): any {
    return this.translate.instant(text);
  }
  createGoogleMapsLink(latitude: number, longitude: number): string {
    const baseUrl = "https://www.google.com/maps/search/?api=1&query=";
    return `${baseUrl}${latitude},${longitude}`;
  }
  clearValidationErrors(control: AbstractControl): void {
    control.markAsPending();
  }
  validateAllFormFields(form: any): void {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  addNotRequiredValidators(form: any, control: string[], min?: any, max?: any, pattern?: any): any {
    form.get(control)?.setValidators([Validators.minLength(min), Validators.maxLength(max), Validators.pattern(pattern)]);
    form.get(control)?.updateValueAndValidity();
  }
  addAllValidators(form: any, control: string, min?: any, max?: any, pattern?: any): any {
    form.get(control)?.setValidators([Validators.required, Validators.minLength(min), Validators.maxLength(max), Validators.pattern(pattern)]);
    form.get(control)?.updateValueAndValidity();
  }
  addValidatorsWithPattern(form: any, control: string, pattern?: any): any {
    form.get(control)?.setValidators([Validators.required, Validators.pattern(pattern)]);
    form.get(control)?.updateValueAndValidity();
  }
  IsNationalIdentityAvailable(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/' + roots.dashboard.availability.IsNationalIdentityAvailable, data);
  }
  IsEmailAvailable(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/' + roots.dashboard.availability.IsEmailAvailable, data);
  }
  IsPhoneAvailable(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/' + roots.dashboard.availability.IsPhoneAvailable, data);
  }
  IsRecordNumberAvailable(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/' + roots.dashboard.availability.IsRecordNumberAvailable, data);
  }
  IsResidencyNumberAvailable(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/' + roots.dashboard.availability.IsResidencyNumberAvailable, data);
  }
  IsOperatingCardAvailable(data: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + '/' + roots.dashboard.availability.IsOperatingCardAvailable, data);
  }

  getCities(): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}/${roots?.auth.isEmailAvailable}`);
  }
}
