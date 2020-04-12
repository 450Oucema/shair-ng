import {Component, OnDestroy, OnInit} from '@angular/core';
import {Fichier} from '../models/fichier.model';
import {Subscription} from 'rxjs';
import {FichierService} from '../services/fichier.service';
import {Router} from '@angular/router';
import {TypeService} from '../services/type.service';
import {Type} from '../models/type.model';
import {element} from 'protractor';

@Component({
  selector: 'app-fichier-list',
  templateUrl: './fichier-list.component.html',
  styleUrls: ['./fichier-list.component.css']
})
export class FichierListComponent implements OnInit, OnDestroy {

  fichiers: Fichier[];
  fichierSubscription: Subscription;
  types: Type[];

  constructor(private fichierService: FichierService, private router: Router, private typeService: TypeService) { }

  ngOnInit() {
    this.fichierSubscription = this.fichierService.fichiersSubject.subscribe(
      (fichiers: Fichier[]) => {
        this.fichiers = fichiers;
      }
    );
    this.typeService.saveTypes();
    this.fichierService.getFichiers();
    this.types = this.typeService.types;
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

  onDownload(url: string) {
    window.open(url, "_blank")
  }

  checkImage(ext: string) {
    let filterResult: Array<any> = this.types.filter(element => element.ext == ext && element.label == 'img');
    if(filterResult.length > 0) {
      return true;
    }
    return false;
  }

  getImgIcon(ext: string) {
    let type = this.types.find(
      element => element.ext == ext
    );

    return type.image
  }
}
