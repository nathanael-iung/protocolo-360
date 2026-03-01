import { Routes } from '@angular/router';
import { domainRoutes } from "@core/components/domain/domain.routes";
import { loginGuard } from "@core/guards/login/login-guard";

export const routes: Routes = [
  { path: '',
    loadComponent: () => import('./core/components/domain/domain').then(m => m.Domain),
    children: domainRoutes,
    data: {
      animation: 'Domain'
    }
  },
  {
    path: 'login',
    canActivate: [loginGuard],
    loadComponent: () => import('./pages/login/login').then(m => m.Login),
    data: {
      animation: 'Login'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register').then(m => m.Register),
    data: {
      animation: 'Register'
    }
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
