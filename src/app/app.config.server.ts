import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
    // Se elimina la línea de provideNoopAnimations()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
