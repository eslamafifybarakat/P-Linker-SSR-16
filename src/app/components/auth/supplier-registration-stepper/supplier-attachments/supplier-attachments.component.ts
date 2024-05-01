// Modules
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';

// Components
import { FileUploadComponent } from './../../../../shared/components/upload-files/file-upload/file-upload.component';

//Services
import { SupplierRegisterService } from '../../../../services/supplier-register.service';
import { PublicService } from './../../../../services/generic/public.service';
import { AlertsService } from './../../../../services/generic/alerts.service';
import { Subscription, catchError, distinctUntilChanged, tap } from 'rxjs';
import { ChangeDetectorRef, Component } from '@angular/core';
import { TooltipModule } from 'primeng/tooltip';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
@Component({
  standalone: true,
  imports: [
    // Modules
    ReactiveFormsModule,
    TranslateModule,
    DropdownModule,
    TooltipModule,
    CommonModule,
    TableModule,
    FormsModule,

    // Components
    FileUploadComponent

  ],
  selector: 'app-supplier-attachments',
  templateUrl: './supplier-attachments.component.html',
  styleUrls: ['./supplier-attachments.component.scss']
})
export class SupplierAttachmentsComponent {
  private subscriptions: Subscription[] = [];

  isSupplierDataReturn: boolean = false;
  supplierData: any;
  supplierId: number = null;

  // Attachments Type Variables
  attachmentsType: any = [];
  isLoadingAttachmentsType: boolean = false;

  attachments: any = [];
  showImage: boolean = false;

  constructor(
    private supplierRegisterService: SupplierRegisterService,
    private alertsService: AlertsService,
    public publicService: PublicService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    private router: Router,
  ) { }
  attachmentsForm: any = this.fb?.group({
    documentName: ['', { validators: [Validators.required, , Validators.minLength(2)], updateOn: 'blur' }],
    documentType: [null, { validators: [Validators.required] }],
    attachmentFile: [null, { validators: [Validators.required] }],
    typeName: ['', { validators: [Validators.minLength(2)], updateOn: 'blur' }]
  })
  get attachmentsFormControls(): any {
    return this.attachmentsForm?.controls;
  }
  ngOnInit(): void {
    this.getAttachmentsType();
  }


  // Start Get Attachments Type
  getAttachmentsType(): void {
    this.isLoadingAttachmentsType = true;
    let getAttachmentsTypeSubscription: Subscription = this.supplierRegisterService?.getAttachmentsType().pipe(
      tap(res => this.handleAttachmentsType(res)),
      catchError(err => this.handleAttachmentsTypeError(err))
    ).subscribe();
    this.subscriptions.push(getAttachmentsTypeSubscription);
  }
  private handleAttachmentsType(res: any): void {
    if (res) {
      this.attachmentsType = res;
    } else {
      this.handleAttachmentsTypeError(res?.message);
    }
    this.isLoadingAttachmentsType = false;
    this.cdr.detectChanges();
  }
  private handleAttachmentsTypeError(err: any): any {
    this.isLoadingAttachmentsType = false;
    this.handleError(err);
    this.attachmentsType = [
      { id: 1, businessName: 'businessName 1', businessDescription: 'businessDescription 1' },
      { id: 1, businessName: 'businessName 2', businessDescription: 'businessDescription 2' },
      { id: 1, businessName: 'businessName 3', businessDescription: 'businessDescription 3' }
    ]
  }
  // End  Get Attachments Type

  addAttachment(): void {
    // if (this.attachmentsForm?.valid) {
    //   let formData = new FormData();
    //   formData.append("file", this.attachmentFile);
    //   this.publicService?.show_loader?.next(true);
    //   this.supplierService?.addAttachment(formData)?.subscribe(
    //     (res: any) => {
    //       if (res) {
    //         this.publicService?.show_loader?.next(false);
    //         this.attachments?.push({
    //           id: 0,
    //           attachmentTypeId: this.attachmentsForm?.value?.documentType?.id,
    //           attachmentTypeName: this.attachmentsForm?.value?.documentType?.businessName,
    //           displayName: this.attachmentsForm?.value?.documentName,
    //           fileName: this.attachmentFile?.name,
    //           contentType: this.attachmentFile?.type,
    //           link: res?.data ? res?.data : ''
    //         });
    //         this.attachmentsForm?.reset();
    //         this.showImage = false;
    //       } else {
    //         res?.error?.message ? this.alertsService?.openSweetAlert('error', res?.error?.message) : '';
    //         this.publicService?.show_loader?.next(false);
    //       }
    //     },
    //     (err: any) => {
    //       err ? this.alertsService?.openSweetAlert('error', err) : '';
    //       this.publicService?.show_loader?.next(false);
    //     })
    // } else {
    //   this.publicService?.validateAllFormFields(this.attachmentsForm);
    // }
  }
  removeAttachment(index: any): void {
    this.attachments?.splice(index, 1);
  }

  // Start Add Supplier Attachments
  submit(): void {
    if (this.attachmentsForm?.valid) {
      const data = this.extractFormData();
      this.saveSupplierAttachment(data);
    } else {
      this.publicService?.validateAllFormFields(this.attachmentsForm);
    }
  }
  private extractFormData(): any {
    let attachments: any = [];
    this.attachments?.forEach((item: any) => {
      attachments?.push({
        id: item?.id,
        contentType: item?.contentType,
        fileName: item?.fileName,
        displayName: item?.displayName,
        attachmentTypeId: item?.attachmentTypeId,
        link: item?.link
      })
    })
    attachments = this.attachments;
    return {
      supplierId: this.supplierId,
      attatchemnts: attachments
    }
  }
  private saveSupplierAttachment(data: any): void {
    this.publicService?.showGlobalLoader?.next(true);
    let subscribeSaveSupplierAttachment: Subscription = this.supplierRegisterService?.saveSupplierAttachment(data).pipe(
      tap(res => this.handleSaveSupplierAttachmentSuccess(res)),
      catchError(err => this.handleError(err))
    ).subscribe();
    this.subscriptions.push(subscribeSaveSupplierAttachment);
  }
  private handleSaveSupplierAttachmentSuccess(response: any): void {
    this.publicService?.showGlobalLoader?.next(false);
    if (response) {
      this.handleSuccess(response?.message);
      this.router.navigate(['/Supplier-Register/Customer-Ref']);
    } else {
      this.handleError(response?.message);
    }
  }
  // End Add Supplier Attachments

  /* --- Handle api requests messages --- */
  private handleSuccess(msg: any): any {
    this.setMessage(msg || this.publicService.translateTextFromJson('general.successRequest'), 'success');
  }
  private handleError(err: any): any {
    this.setMessage(err || this.publicService.translateTextFromJson('general.errorOccur'), 'error');
  }
  private setMessage(message: string, type: string): void {
    this.alertsService.openToast(type, type, message);
    this.publicService.showGlobalLoader.next(false);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      if (subscription && subscription.closed) {
        subscription.unsubscribe();
      }
    });
  }
}
