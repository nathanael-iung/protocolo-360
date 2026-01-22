import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '',
    loadComponent: () => import('./core/components/domain/domain').then(m => m.Domain),
    children: [

    ]
  },
  {
    path: 'login',
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
