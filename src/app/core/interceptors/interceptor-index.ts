import { HttpInterceptorService } from './http-interceptor.service';
import { HttpErrorInterceptor } from './error-interceptor.service';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserStateInterceptor } from './browser-state-interceptor.service';

export const interceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: BrowserStateInterceptor,
    multi: true
  },
];
