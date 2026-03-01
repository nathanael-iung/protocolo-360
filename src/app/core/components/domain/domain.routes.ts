import { Routes } from "@angular/router";

export const domainRoutes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('@pages/dashboard/dashboard').then(m => m.Dashboard)
  }
]