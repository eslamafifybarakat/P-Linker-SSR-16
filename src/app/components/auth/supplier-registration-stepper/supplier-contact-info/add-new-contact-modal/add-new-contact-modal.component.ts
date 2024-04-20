import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PublicService } from 'src/app/services/generic/public.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { TranslateModule } from '@ngx-translate/core';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    CommonModule,
    FormsModule,
  ],
  selector: 'app-add-new-contact-modal',
  templateUrl: './add-new-contact-modal.component.html',
  styleUrls: ['./add-new-contact-modal.component.scss']
})
export class AddNewContactModalComponent implements OnInit {

  constructor(
    public publicService: PublicService,
    private ref: DynamicDialogRef,
    private fb: FormBuilder,
  ) { }

  modalForm: any = this.fb?.group({
    name: ['', {
      validators: [Validators.required, Validators.minLength(2)]
      , updateOn: 'blur'
    }]
  })
  get formControls(): any {
    return this.modalForm?.controls;
  }
  ngOnInit(): void {
  }

  submit(): void {
    if (this.modalForm?.valid) {
      this.ref?.close({ addName: true, data: this.modalForm?.value });
    } else {
      this.publicService?.validateAllFormFields(this.modalForm);
    }
  }
  cancel(): void {
    this.ref?.close({ addName: false });
  }
}
