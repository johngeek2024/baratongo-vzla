import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart';
import { AuthService } from '../../services/auth'; // 1. Importar AuthService

@Component({
  selector: 'app-tab-bar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tab-bar.html',
  styleUrls: ['./tab-bar.scss']
})
export class TabBar implements OnInit {
  public cartItemCount: number = 0;
  public isLoggedIn: boolean = false; // 2. Propiedad para el estado de login

  // 3. Inyectar AuthService
  constructor(
    private cartService: CartService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });

    // 4. Suscripción al estado de login
    this.authService.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  }
}
