import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'jokes',
    loadChildren: () => import('././view/jokes/jokes.module').then( m => m.JokesPageModule)
  },
  {
    path: '',
    redirectTo: 'jokes',
    pathMatch: 'full'
  },
  {
    path: 'jokes',
    loadChildren: () => import('./view/jokes/jokes.module').then( m => m.JokesPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
