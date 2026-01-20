import { Routes } from '@angular/router';
import { Login } from "./pages/login/login";

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
    path: '**',
    redirectTo: 'login'
  }
];
