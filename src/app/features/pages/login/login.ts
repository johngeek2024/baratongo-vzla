import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;

    try {
      const user = await this.authService.login(email, password);
      if (user) {
        // Navega al perfil en un login exitoso
        this.router.navigate(['/perfil']);
      } else {
        // Firebase Auth maneja errores a través del catch, pero esto es un respaldo
        alert('Correo o contraseña incorrectos.');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      alert('Correo o contraseña incorrectos.');
    }
  }
}
