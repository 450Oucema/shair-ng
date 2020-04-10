import {Component, OnDestroy, OnInit} from '@angular/core';
import {Fichier} from '../models/fichier.model';
import {Subscription} from 'rxjs';
import {FichierService} from '../services/fichier.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-fichier-list',
  templateUrl: './fichier-list.component.html',
  styleUrls: ['./fichier-list.component.css']
})
export class FichierListComponent implements OnInit, OnDestroy {

  fichiers: Fichier[];
  fichierSubscription: Subscription;

  constructor(private fichierService: FichierService, private router: Router) { }

  ngOnInit() {
    this.fichierSubscription = this.fichierService.fichiersSubject.subscribe(
      (fichiers: Fichier[]) => {
        this.fichiers = fichiers;
      }
    );
    this.fichierService.getFichiers();
  }

  onNewFichier() {
    this.router.navigate(['/fichiers', 'new']);
  }

  onViewFichier(id: number) {
    this.router.navigate(['/fichiers', 'show', id]);
  }

  onDeleteFichier(fichier: Fichier) {
    this.fichierService.removeFichier(fichier);
  }

  ngOnDestroy(): void {
    this.fichierSubscription.unsubscribe();
  }

  onDownload(uuid: string) {
    this.router.navigate(['/download', uuid]);
  }
}
