import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Rutas corregidas basadas en tu estructura de carpetas
import { Header } from '../components/header/header';
import { BottomNav } from '../components/bottom-nav/bottom-nav';
import { Footer } from '../components/footer/footer';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, Header, BottomNav, Footer],
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss']
})
export class Layout {

}
