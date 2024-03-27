import { FeatureDetailsComponent } from './components/home/features/feature-details/feature-details.component';
import { Routes } from '@angular/router';

// Components

// TS Files for child routes
import { servicesChildrenRoutes } from './components/services/services-children-routes';
import { placesChildrenRoutes } from './components/places/places-children-routes';
import { authChildrenRoutes } from './components/auth/auth-children-routes';
import { errorsChildrenRoutes } from './components/errors/errors-routes';


export const appRoutes: Routes = [
  { path: '', redirectTo: '/Home', pathMatch: 'full' },
  {
    path: 'auth',
    loadComponent: () =>
      import('./components/auth/auth.component').then(
        (c) => c.AuthComponent
      ),
    children: authChildrenRoutes
  },
  {
    path: 'Home',
    loadComponent: () =>
      import('./components/home/home.component').then(
        (c) => c.HomeComponent
      )
  },
  {
    path: 'Features',
    loadComponent: () =>
      import('./components/home/features/features.component').then(
        (c) => c.FeaturesComponent
      )
  },
  {
    path: 'Features-Details/:id',
    loadComponent: () =>
      import('./components/home/features/feature-details/feature-details.component').then(
        (c) => c.FeatureDetailsComponent
      )
  },
  {
    path: 'Resources',
    loadComponent: () =>
      import('./components/home/resources/resources.component').then(
        (c) => c.ResourcesComponent
      )
  },
  {
    path: 'Resource-Details/:id',
    loadComponent: () =>
      import('./components/home/resources/resource-details/resource-details.component').then(
        (c) => c.ResourceDetailsComponent
      )
  },
  {
    path: 'About-Us',
    loadComponent: () =>
      import('./components/home/about/about.component').then(
        (c) => c.AboutComponent
      )
  },
  {
    path: 'Contact-Us',
    loadComponent: () =>
      import('./components/home/contact-us/contact-us.component').then(
        (c) => c.ContactUsComponent
      )
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
    path: 'Services',
    loadComponent: () =>
      import('./components/services/services.component').then(
        (c) => c.ServicesComponent
      ),
    children: servicesChildrenRoutes
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
