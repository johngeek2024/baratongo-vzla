import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TabBar } from '../components/tab-bar/tab-bar'; // CORREGIDO

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, TabBar], // CORREGIDO
  templateUrl: './layout.html',
  styleUrls: ['./layout.scss']
})
export class Layout {} // CORREGIDO
