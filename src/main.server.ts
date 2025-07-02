import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app'; // CORREGIDO: Importa AppComponent
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config); // CORREGIDO: Usa AppComponent

export default bootstrap;
