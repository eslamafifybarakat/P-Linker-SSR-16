import { PublicService } from './../../../services/generic/public.service';
import { supplierItemsAr, supplierItemsEn } from './supplier';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { StepsModule } from 'primeng/steps';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule,
    StepsModule,
  ],
  selector: 'app-supplier-registration-stepper',
  templateUrl: './supplier-registration-stepper.component.html',
  styleUrls: ['./supplier-registration-stepper.component.scss']
})
export class SupplierRegistrationStepperComponent {
  items: MenuItem[];
  activeIndex: number = 1;
  currentLanguage: string | null = '';
  labels: string[] = [];
  constructor(
    private publicService: PublicService
  ) { }

  ngOnInit(): void {
    this.currentLanguage = this.publicService.getCurrentLanguage();
    this.labels = this.currentLanguage == 'ar' ? supplierItemsAr : supplierItemsEn;
    this.items = [{
      label: this.labels[0],
      routerLink: 'Details',
      command: (event: any) => {
        this.activeIndex = 0;
      }
    },
    {
      label: this.labels[1],
      routerLink: 'Address',
      command: (event: any) => {
        this.activeIndex = 1;
      }
    },
    {
      label: this.labels[2],
      routerLink: 'Contact-Info',
      command: (event: any) => {
        this.activeIndex = 3;
      }
    },
    {
      label: this.labels[3],
      routerLink: 'Bank-Info',
      command: (event: any) => {
        this.activeIndex = 4;
      }
    },
    {
      label: this.labels[4],
      routerLink: 'Customer-Ref',
      command: (event: any) => {
        this.activeIndex = 5;
      }
    },
    {
      label: this.labels[5],
      routerLink: 'Companies',
      command: (event: any) => {
        this.activeIndex = 6;
      }
    },
    {
      label: this.labels[6],
      routerLink: 'Attachment',
      command: (event: any) => {
        this.activeIndex = 7;
      }
    },
    ];
  }
}
