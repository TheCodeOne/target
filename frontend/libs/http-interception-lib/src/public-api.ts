import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ModuleWithProviders, NgModule } from "@angular/core";

import { HttpErrorInterceptorService,InterceptionBusService } from "./lib/http-interception-lib/services";

@NgModule()
  export class HttpInterceptionModule {
    static forRoot(): ModuleWithProviders<HttpInterceptionModule> {
      return {
        ngModule: HttpInterceptionModule,
        providers: [
          InterceptionBusService, 
          {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpErrorInterceptorService,
            multi: true,
          },
        ],
      };
    }
  }