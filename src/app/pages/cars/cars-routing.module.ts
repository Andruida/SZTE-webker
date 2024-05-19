import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarsComponent } from './cars.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarsComponent }, 
  { path: ':id/insurances', loadChildren: () => import('../insurances/insurances.module').then(m => m.InsurancesModule) },
  { path: ':id', loadChildren: () => import('./car-details/car-details.module').then(m => m.CarDetailsModule)  }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule { }
