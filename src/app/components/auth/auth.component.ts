import { Router, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [RouterModule, TranslateModule],
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  constructor(
    private router: Router
  ) { }
  getTitle(): string {
    if (this.router.url.includes('login')) {
      return 'auth.welcomeBack'
    }
    if (this.router.url.includes('supplier')) {
      return 'auth.expandYourNetwork'
    }
    if (this.router.url.includes('buyer')) {
      return 'auth.findYourBuyer'
    }
    else {
      return 'auth.welcomeBack';
    }
  }
}
