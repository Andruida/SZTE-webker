import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { isLoggedInGuard } from './shared/is-logged-in.guard';
import { isLoggedOutGuard } from './shared/is-logged-out.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/cars',
    // canActivate: [isLoggedInGuard],
    // loadChildren: () =>
    //   import('./pages/main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'login',
    canActivate: [isLoggedOutGuard],
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    canActivate: [isLoggedOutGuard],
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'cars',
    canActivate: [isLoggedInGuard],
    loadChildren: () =>
      import('./pages/cars/cars.module').then((m) => m.CarsModule),
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
