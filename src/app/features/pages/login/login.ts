import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
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

  // Getters para acceder fácilmente a los controles desde el HTML
  get email(): AbstractControl | null { return this.loginForm.get('email'); }
  get password(): AbstractControl | null { return this.loginForm.get('password'); }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      // Marca todos los campos como 'tocados' para mostrar los errores si el usuario intenta enviar
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.value;

    try {
      const user = await this.authService.login(email, password);
      if (user) {
        this.router.navigate(['/perfil']);
      } else {
        alert('Correo o contraseña incorrectos.');
      }
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      alert('Correo o contraseña incorrectos.');
    }
  }
}
