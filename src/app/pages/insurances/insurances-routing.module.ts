import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsurancesComponent } from './insurances.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: InsurancesComponent }, 
  { path: ':id/events', loadChildren: () => import('../events/events.module').then(m => m.EventsModule) }, 
  { path: ':id', loadChildren: () => import('./insurance-details/insurance-details.module').then(m => m.InsuranceDetailsModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InsurancesRoutingModule { }
