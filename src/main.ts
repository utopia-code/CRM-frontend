import { registerLocaleData } from '@angular/common';
import localeGl from '@angular/common/locales/gl';
import { ApplicationModule } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

registerLocaleData(localeGl);

platformBrowserDynamic()
  .bootstrapModule(ApplicationModule)
  .catch((err) => console.error(err));

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
