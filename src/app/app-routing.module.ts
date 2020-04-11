import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FichierListComponent} from './fichier-list/fichier-list.component';
import {FichierFormComponent} from './fichier-list/fichier-form/fichier-form.component';
import {FichierComponent} from './fichier-list/fichier/fichier.component';
import {DownloadFileComponent} from "./fichier-list/download-file/download-file.component";
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  { path: 'fichiers', component: FichierListComponent},
  { path: 'fichiers/show/:id', component: FichierComponent},
  { path: 'download/:uuid', component: DownloadFileComponent},
  { path: 'fichiers/new', component: FichierFormComponent},
  { path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
