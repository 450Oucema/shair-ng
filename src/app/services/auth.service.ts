import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {error} from 'util';
import { Subject } from 'rxjs/Subject';
import {Admin} from '../models/admin.model';

@Injectable()
export class AuthService {

  adminSubject = new Subject<Admin[]>();
  admins: Admin[] = [
    {
      uid: 'LaZFSvekZff2927dancvY57DBTe2'
    }
  ];

  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      });
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email,password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        )
      }
    )
  }
  signOutUser() {
    firebase.auth().signOut();
  }


  emitAdmins() {
    this.adminSubject.next(this.admins);
  }

  saveFichiers() {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/admin/').set(this.admins);
      }
    );
  }

  getFichiers() {
    firebase.database().ref('/admin/').on('value', (data) => {
      this.admins = data.val() ? data.val() : [];
      this.emitAdmins();
    });
  }

  getEmail(user: any) {
    return 'oucemajlaiel';
  }
}
