import { registerLocaleData } from '@angular/common';
import localeGl from '@angular/common/locales/gl';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

registerLocaleData(localeGl);

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
