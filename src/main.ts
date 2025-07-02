import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // CORREGIDO: Importa AppComponent

bootstrapApplication(AppComponent, appConfig) // CORREGIDO: Usa AppComponent
  .catch((err) => console.error(err));
