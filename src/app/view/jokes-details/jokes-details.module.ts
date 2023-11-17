import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JokesDetailsPageRoutingModule } from './jokes-details-routing.module';

import { JokesDetailsPage } from './jokes-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JokesDetailsPageRoutingModule
  ],
  declarations: [JokesDetailsPage]
})
export class JokesDetailsPageModule {}
