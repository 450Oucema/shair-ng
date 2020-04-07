import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FichierListComponent } from './fichier-list/fichier-list.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {FichierComponent} from './fichier-list/fichier/fichier.component';
import {FichierFormComponent} from './fichier-list/fichier-form/fichier-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {FichierService} from './services/fichier.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    FichierComponent,
    FichierListComponent,
    FichierFormComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    BrowserModule,
    BrowserAnimationsModule,
  ],
  providers: [FichierService],
  bootstrap: [AppComponent]
})
export class AppModule { }
