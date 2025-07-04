import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // 1. Importar RouterModule

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule], // 2. Añadirlo a los imports
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class Header {

}
