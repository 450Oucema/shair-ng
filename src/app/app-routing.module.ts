import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FichierListComponent} from './fichier-list/fichier-list.component';
import {FichierFormComponent} from './fichier-list/fichier-form/fichier-form.component';
import {FichierComponent} from './fichier-list/fichier/fichier.component';
import {DownloadFileComponent} from "./fichier-list/download-file/download-file.component";
import {HomeComponent} from './home/home.component';
import {SigninComponent} from "./auth/signin/signin.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {AccountComponent} from './account/account.component';
import {AdminComponent} from './admin/admin.component';
import {WatchComponent} from './admin/watch/watch.component';
import {UserComponent} from './admin/watch/user/user.component';


const routes: Routes = [
  { path: 'fichiers', component: FichierListComponent, canActivate: [AuthGuardService]},
  { path: 'fichiers/show/:uuid', component: FichierComponent, canActivate: [AuthGuardService]},
  { path: 'download/:uuid', component: DownloadFileComponent, canActivate: [AuthGuardService]},
  { path: 'account', component: AccountComponent, canActivate: [AuthGuardService]},
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuardService]},
  { path: 'admin/watch', component: WatchComponent, canActivate: [AuthGuardService]},
  { path: 'admin/watch/:uid', component: UserComponent, canActivate: [AuthGuardService]},
  { path: 'admin/fichiers/new', component: FichierFormComponent, canActivate: [AuthGuardService]},
  { path: 'login', component: SigninComponent},
  { path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
