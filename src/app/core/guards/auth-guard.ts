import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth'; // o .../auth
import { map, Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state): Observable<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Nos suscribimos al observable que nos dice si el usuario está conectado
  return authService.isLoggedIn$.pipe(
    map(isLoggedIn => {
      // Si el estado es 'true' (conectado), permitimos el acceso.
      if (isLoggedIn) {
        return true;
      }

      // Si es 'false', creamos una instrucción para redirigir al login.
      // Esta es la forma moderna y segura de manejar redirecciones en guardias.
      return router.createUrlTree(['/login']);
    })
  );
};
