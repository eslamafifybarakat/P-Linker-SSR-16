import { Routes } from '@angular/router';

// Components

// TS Files for child routes
import { placesChildrenRoutes } from './components/places/places-children-routes';
import { errorsChildrenRoutes } from './components/errors/errors-routes';


export const appRoutes: Routes = [
  { path: '', redirectTo: '/places', pathMatch: 'full' },

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
