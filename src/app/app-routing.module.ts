import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FichierListComponent} from './fichier-list/fichier-list.component';
import {FichierFormComponent} from './fichier-list/fichier-form/fichier-form.component';
import {FichierComponent} from './fichier-list/fichier/fichier.component';


const routes: Routes = [
  { path: 'fichiers', component: FichierListComponent},
  { path: 'fichiers/show/:id', component: FichierComponent},
  { path: 'fichiers/new', component: FichierFormComponent},
  { path: '', component: FichierListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
