import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';
import { provideNoopAnimations } from '@angular/platform-browser/animations'; // Importar

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideNoopAnimations() // Añadir
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
