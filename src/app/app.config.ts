import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideAnimations} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { provideTheming, themingInitializer } from '@fundamental-ngx/core/theming';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    importProvidersFrom(HttpClientModule), provideTheming({ defaultTheme: 'sap_fiori_3_light_dark', changeThemeOnQueryParamChange: true }), themingInitializer()
  ]
};
