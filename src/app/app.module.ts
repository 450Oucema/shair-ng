import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FichierListComponent } from './fichier-list/fichier-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {FichierComponent} from './fichier-list/fichier/fichier.component';
import {FichierFormComponent} from './fichier-list/fichier-form/fichier-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, } from '@angular/common/http';
import {FichierService} from './services/fichier.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import {DownloadFileComponent} from "./fichier-list/download-file/download-file.component";
import { HomeComponent } from './home/home.component';
import {TypeService} from './services/type.service';
import {AuthService} from "./services/auth.service";
import { SigninComponent } from './auth/signin/signin.component';
import {AuthGuardService} from "./services/auth-guard.service";
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { WatchComponent } from './admin/watch/watch.component';
import { UserComponent } from './admin/watch/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    FichierComponent,
    FichierListComponent,
    FichierFormComponent,
    HeaderComponent,
    DownloadFileComponent,
    HomeComponent,
    SigninComponent,
    AccountComponent,
    AdminComponent,
    WatchComponent,
    UserComponent,
  ],
    imports: [
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        IonicModule.forRoot(),
        FormsModule,
    ],
  providers: [FichierService, TypeService, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
