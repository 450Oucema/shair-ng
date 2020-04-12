import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FichierListComponent } from './fichier-list/fichier-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {FichierComponent} from './fichier-list/fichier/fichier.component';
import {FichierFormComponent} from './fichier-list/fichier-form/fichier-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, } from '@angular/common/http';
import {FichierService} from './services/fichier.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import {UtilityService} from "./services/utility.service";
import { HeaderComponent } from './header/header.component';
import {DownloadFileComponent} from "./fichier-list/download-file/download-file.component";
import { HomeComponent } from './home/home.component';
import {TypeService} from './services/type.service';

@NgModule({
  declarations: [
    AppComponent,
    FichierComponent,
    FichierListComponent,
    FichierFormComponent,
    HeaderComponent,
    DownloadFileComponent,
    HomeComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(),
  ],
  providers: [FichierService, TypeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
