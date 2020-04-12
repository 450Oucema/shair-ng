import {Type} from '../models/type.model';
import { Subject } from 'rxjs/Subject';
import * as firebase from 'firebase';

export class TypeService {

  types: Type[] = [
    {
      ext: "image/jpeg",
      label: "img",
      image: null
    },
    {
      ext: "image/x-icon",
      label: "img",
      image: null
    },
    {
      ext: "image/gif",
      label: "img",
      image: null
    },
    {
      ext: "image/png",
      label: "img",
      image: null
    },
    {
      ext: "psd",
      label: "photoshop",
      image: "https://icons.iconarchive.com/icons/pelfusion/flat-file-type/512/psd-icon.png"
    },
    {
      ext: "application/x-zip-compressed",
      label: "zip",
      image: "https://image.flaticon.com/icons/png/512/1465/1465628.png"
    },
    ];

  typeSubject = new Subject<Type[]>();
  constructor() {
  }

  emitTypes() {
    this.typeSubject.next(this.types);
  }

  saveTypes() {
    return new Promise(
      (resolve, reject) => {
        console.log(this.types.find(element => element.label = 'img'));
        firebase.database().ref('/types').set(this.types)
      }
    );
  }

  getTypes() {
    firebase.database().ref('/types').on('value', (data) => {
      this.types = data.val() ? data.val() : [];
      this.emitTypes();
    })
  }

  createNewType(newType: Type) {
    this.types.push(newType);
    this.saveTypes();
    this.emitTypes();
  }

  findType(extension: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/types/').once('value').then(
          (data) => {
            resolve(data.val().find(element => element.ext = extension));
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

}
