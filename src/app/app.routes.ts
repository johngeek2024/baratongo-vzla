import { Routes } from '@angular/router';

// Importaciones de los componentes de página
import { Home } from './features/pages/home/home';
import { Search } from './features/pages/search/search';
import { Cart } from './features/pages/cart/cart';
import { Profile } from './features/pages/profile/profile';
import { Checkout } from './features/pages/checkout/checkout';
import { Login } from './features/pages/login/login';
import { Register } from './features/pages/register/register';
import { ProductDetail } from './features/pages/product-detail/product-detail';

// Importaciones de los layouts y dashboards de admin
import { AdminLayout } from './core/layouts/admin-layout/admin-layout';
import { Dashboard } from './features/admin/dashboard/dashboard';
import { ManageProducts } from './features/admin/manage-products/manage-products';

// Importación del Guardia de Autenticación
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  // CORRECCIÓN FINAL: La ruta raíz ahora carga HomeComponent directamente
  { path: '', component: Home },

  // El resto de las rutas permanecen igual
  { path: 'inicio', component: Home },
  { path: 'busqueda', component: Search },
  { path: 'carrito', component: Cart },
  { path: 'checkout', component: Checkout },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'producto/:id', component: ProductDetail },

  // Ruta de Perfil protegida
  {
    path: 'perfil',
    component: Profile,
    canActivate: [authGuard]
  },

  // Rutas del Panel de Administración protegidas
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'productos', component: ManageProducts }
    ]
  }
];
