import {Fichier} from '../models/fichier.model';
import {Subject} from 'rxjs';
import * as firebase from 'firebase';

export class FichierService {
  fichiers: Fichier[] = [];
  fichiersSubject = new Subject<Fichier[]>();
  constructor() {
  }

  emitFichiers() {
    this.fichiersSubject.next(this.fichiers);
  }
  saveFichier() {
    firebase.database().ref('/fichiers').on('value', (data) => {
      this.fichiers = data.val() ? data.val() : [];
      this.emitFichiers();
    });
  }
}
