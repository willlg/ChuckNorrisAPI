import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JokesDetailsPage } from './jokes-details.page';

const routes: Routes = [
  {
    path: '',
    component: JokesDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JokesDetailsPageRoutingModule {}
