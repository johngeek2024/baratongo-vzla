import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Layout } from './core/layout/layout'; // CORREGIDO

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, Layout], // CORREGIDO
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class AppComponent {
  title = 'baratongo-vzla';
}
