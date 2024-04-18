import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    CommonModule,
    FormsModule,
  ],
  selector: 'app-supplier-registration-stepper',
  templateUrl: './supplier-registration-stepper.component.html',
  styleUrls: ['./supplier-registration-stepper.component.scss']
})
export class SupplierRegistrationStepperComponent {

}
