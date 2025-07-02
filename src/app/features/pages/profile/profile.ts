import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // 1. Importar Router
import { AuthService } from '../../../core/services/auth';
import { User } from '@angular/fire/auth';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrls: ['./profile.scss']
})
export class Profile implements OnInit {
  user: User | null = null;

  // 2. Inyectar Router en el constructor
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });
  }

  logout(): void {
    this.authService.logout();
    // 3. Añadir esta línea para redirigir al usuario
    this.router.navigate(['/login']);
  }
}
