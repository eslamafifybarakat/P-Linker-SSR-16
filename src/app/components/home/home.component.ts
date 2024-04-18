import { keys } from './../../shared/configs/localstorage-key';
import { PublicService } from './../../services/generic/public.service';
import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { homeDataAr, homeDataEn } from './home';
import { RouterModule } from '@angular/router';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
  ) { }

  ngOnInit(): void {

  }
}

