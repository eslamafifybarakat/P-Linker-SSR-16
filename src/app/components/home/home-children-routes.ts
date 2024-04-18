import { ErrorsComponent } from "../errors/errors.component";

export const homeChildrenRoutes: any[] = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  {
    path: 'Home',
    loadComponent: () =>
      import('./home-page/home-page.component').then(
        (c) => c.HomePageComponent
      )
  },
  {
    path: 'Features',
    loadComponent: () =>
      import('./features/features.component').then(
        (c) => c.FeaturesComponent
      )
  },
  {
    path: 'Features-Details/:id',
    loadComponent: () =>
      import('./features/feature-details/feature-details.component').then(
        (c) => c.FeatureDetailsComponent
      )
  },
  {
    path: 'Resources',
    loadComponent: () =>
      import('./resources/resources.component').then(
        (c) => c.ResourcesComponent
      )
  },
  {
    path: 'Resource-Details/:id',
    loadComponent: () =>
      import('./resources/resource-details/resource-details.component').then(
        (c) => c.ResourceDetailsComponent
      )
  },
  {
    path: 'About-Us',
    loadComponent: () =>
      import('./about/about.component').then(
        (c) => c.AboutComponent
      )
  },
  {
    path: 'Contact-Us',
    loadComponent: () =>
      import('./contact-us/contact-us.component').then(
        (c) => c.ContactUsComponent
      )
  },
  { path: '**', component: ErrorsComponent }
];
