import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get name(): AbstractControl | null { return this.registerForm.get('name'); }
  get email(): AbstractControl | null { return this.registerForm.get('email'); }
  get password(): AbstractControl | null { return this.registerForm.get('password'); }

  async onSubmit(): Promise<void> {
    if (this.registerForm.invalid) {
      // Esta línea es la que fuerza la aparición de los mensajes.
      this.registerForm.markAllAsTouched();
      return;
    }

    const { name, email, password } = this.registerForm.value;
    const user = await this.authService.register(name, email, password);

    if (user) {
      this.router.navigate(['/perfil']);
    } else {
      alert('Error al registrar la cuenta. El correo ya podría estar en uso.');
    }
  }
}
