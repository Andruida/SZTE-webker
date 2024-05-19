import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceDetailsComponent } from './insurance-details.component';

const routes: Routes = [{ path: '', component: InsuranceDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsuranceDetailsRoutingModule { }
