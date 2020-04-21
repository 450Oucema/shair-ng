import {Fichier} from '../models/fichier.model';
import {Subject} from 'rxjs/Subject';
import * as firebase from 'firebase';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class FichierService {

  fichiers: Array<any>;
  fichiersSubject = new Subject<Fichier[]>();
  users: Array<any>;
  usersSubject = new Subject<any>();

  constructor(private httpClient: HttpClient) { }

  emitFichiers() {
    this.fichiersSubject.next(this.fichiers);
  }

  emitUsers() {
    this.usersSubject.next(this.users);
  }

  saveFichiers() {
    return new Promise(
      (resolve, reject) => {
        console.log(this.fichiers)
        firebase.database().ref('/fichiers/'+firebase.auth().currentUser.uid).set(this.fichiers)
      }
    );
  }

  getFichiers(uid = null) {
    if(!uid) {
      uid = firebase.auth().currentUser.uid;
    }
    firebase.database().ref('/fichiers/'+ uid).on('value', (data) => {
      this.fichiers = data.val() ? data.val() : [];
      this.emitFichiers();
    });
  }
  getSingleFichier(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/fichiers/' + firebase.auth().currentUser.uid + '/' + id).once('value').then(
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
        firebase.database().ref('/fichiers/'+firebase.auth().currentUser.uid+'/').once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewFichier(newFichier: Fichier) {
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
        const upload = firebase.storage().ref().child('images/' + firebase.auth().currentUser.email +'/' + fileName).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (data) => {},
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

  onCopy(val: string){
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  onDownload(url: string) {
    window.open(url, "_blank")
  }

  getUsersFiles() {
    firebase.database().ref('/users/').on('value', (data) => {
      this.users = data.val();
      this.emitUsers();
    });
  }

  createNewFichierUser(newFichier: Fichier, user: string) {
    this.fichiers.push(newFichier);
    this.saveFichiersUser(user);
    this.emitFichiers();
  }

  saveFichiersUser(user: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/fichiers/'+ user).set(this.fichiers)
      }
    );
  }
}

