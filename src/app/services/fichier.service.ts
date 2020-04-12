import {Fichier} from '../models/fichier.model';
import {Subject} from 'rxjs/Subject';
import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import {v4 as uuid4} from 'uuid';
import {filter} from 'rxjs-compat/operator/filter';

@Injectable()
export class FichierService {

  fichiers: Array<Fichier> = [];
  fichiersSubject = new Subject<Fichier[]>();

  constructor() {
  }

  emitFichiers() {
    this.fichiersSubject.next(this.fichiers);
  }

  saveFichiers() {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/fichiers').set(this.fichiers)
      }
    );
  }

  getFichiers() {
    firebase.database().ref('/fichiers').on('value', (data) => {
      this.fichiers = data.val() ? data.val() : [];
      this.emitFichiers();
    });
  }
  getSingleFichier(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/fichiers/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  findFichierByUuid(uuid: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/fichiers/').once('value').then(
          (data) => {
            resolve(data.val().find(element => element.uuid = uuid));
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewFichier(newFichier: Fichier) {
    console.log(this.fichiers);
    this.fichiers.push(newFichier);
    this.saveFichiers();
    this.emitFichiers();
  }

  removeFichier(fichier: Fichier) {
    if (fichier.details) {
      const storageRef = firebase.storage().refFromURL(fichier.details);
      storageRef.delete().then(
        () => {
          console.log('Fichier supprimé');
        }, (error) => {
          console.log('Impossible de supprimer le fichier..' + error);
        }
      );
    }
    const FichierIndexToRemove = this.fichiers.findIndex(
      (fichierEl) => {
        if (fichierEl === fichier) {
          return true;
        }
      }
    );
    this.fichiers.splice(FichierIndexToRemove, 1);
    this.saveFichiers();
    this.emitFichiers();
  }

  uploadFile(file: File, fileName: string) {
    return new Promise(
      (resolve, reject) => {
        const upload = firebase.storage().ref().child('images/' + fileName).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement....');
          },
          (error) => {
            console.log('Erreur de chargement !' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          });
      }
    );
  }

}

