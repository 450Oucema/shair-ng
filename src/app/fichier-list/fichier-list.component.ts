import {Component, OnDestroy, OnInit} from '@angular/core';
import {Fichier} from '../models/fichier.model';
import {Subscription} from 'rxjs';
import {FichierService} from '../services/fichier.service';
import {Router} from '@angular/router';
import {TypeService} from '../services/type.service';
import {Type} from '../models/type.model';
import {element} from 'protractor';
import * as firebase from 'firebase';

@Component({
  selector: 'app-fichier-list',
  templateUrl: './fichier-list.component.html',
  styleUrls: ['./fichier-list.component.css']
})
export class FichierListComponent implements OnInit, OnDestroy {

  fichiers: Fichier[];
  fichierSubscription: Subscription;
  today: Date = new Date();


  constructor(private fichierService: FichierService, private router: Router, public typeService: TypeService) { }

  ngOnInit() {
    this.fichierSubscription = this.fichierService.fichiersSubject.subscribe(
      (fichiers: Fichier[]) => {
        this.fichiers = fichiers;
      }
    );
    this.typeService.saveTypes();
    this.fichierService.getFichiers();
  }

  onNewFichier() {
    this.router.navigate(['/fichiers', 'new']);
  }

  onViewFichier(id: number) {
    this.router.navigate(['fichiers', 'show', id]);
  }

  onDeleteFichier(fichier: Fichier) {
    this.fichierService.removeFichier(fichier);
  }

  ngOnDestroy(): void {
    this.fichierSubscription.unsubscribe();
  }

  onDownload(url: string) {
    window.open(url, "_blank")
  }

  checkAvailability(expiration: Date) {
    return new Date(expiration) > new Date();
  }

  onCopy(details: string, uuid: string) {
    let input = document.getElementById(uuid) as HTMLInputElement;
    input.focus();
    input.select();
    try {
      document.execCommand('copy');
    }catch (e) {
      console.log(e)
    }
  }
}
