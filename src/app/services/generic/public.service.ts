import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PublicService {

  constructor() { }

  createGoogleMapsLink(latitude: number, longitude: number): string {
    const baseUrl = "https://www.google.com/maps/search/?api=1&query=";
    return `${baseUrl}${latitude},${longitude}`;
  }
}
