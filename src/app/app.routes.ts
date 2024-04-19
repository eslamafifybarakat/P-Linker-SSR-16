import { supplierRegisterChildrenRoutes } from './components/auth/supplier-registration-stepper/supplier-register-children-routes';
import { Routes } from '@angular/router';

// Components

// TS Files for child routes
import { placesChildrenRoutes } from './components/places/places-children-routes';
import { authChildrenRoutes } from './components/auth/auth-children-routes';
import { homeChildrenRoutes } from './components/home/home-children-routes';
import { errorsChildrenRoutes } from './components/errors/errors-routes';
import { dashBoardChildrenRoutes } from './components/dashboard/dashboard-children-routes';


export const appRoutes: Routes = [
  { path: '', redirectTo: 'Main', pathMatch: 'full' },
  {
    path: 'Auth',
    loadComponent: () =>
      import('./components/auth/auth.component').then(
        (c) => c.AuthComponent
      ),
    children: authChildrenRoutes
  },
  {
    path: 'Supplier-Register',
    loadComponent: () =>
      import('./components/auth/supplier-registration-stepper/supplier-registration-stepper.component').then(
        (c) => c.SupplierRegistrationStepperComponent
      ),
    children: supplierRegisterChildrenRoutes
  },
  {
    path: 'Main',
    loadComponent: () =>
      import('./components/home/home.component').then(
        (c) => c.HomeComponent
      ),
    children: homeChildrenRoutes
  },
  {
    path: 'Dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    children: dashBoardChildrenRoutes
  },
  {
    path: ':lang/Dashboard',
    loadComponent: () =>
      import('./components/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    children: dashBoardChildrenRoutes
  },
  {
    path: 'places',
    loadComponent: () =>
      import('./components/places/places.component').then(
        (c) => c.PlacesComponent
      ),
    children: placesChildrenRoutes
  },
  {
    path: ':lang/places',
    loadComponent: () => import('./components/places/places.component').then((c) => c.PlacesComponent),
    children: placesChildrenRoutes
    // canActivate: [LanguageGuard] // Optional: Use a guard to validate the language parameter
  },

  {
    path: '**', loadComponent: () =>
      import('./components/errors/errors.component').then(
        (c) => c.ErrorsComponent
      ),
    children: errorsChildrenRoutes
  }
];
