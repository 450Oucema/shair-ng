import { Component, OnInit } from '@angular/core';
import {Fichier} from '../../models/fichier.model';
import {ActivatedRoute, Router} from '@angular/router';
import {FichierService} from '../../services/fichier.service';
import Downloader from 'js-file-downloader';
import * as firebase from 'firebase';
import {error} from 'util';

@Component({
  selector: 'app-download-file',
  templateUrl: './download-file.component.html',
  styleUrls: ['./download-file.component.css']
})
export class DownloadFileComponent implements OnInit {

  fichier: Fichier;

  constructor(private route: ActivatedRoute, private fichierService: FichierService, private router: Router) { }

  public downloadFile(fileName: string) {
    let fileRef = firebase.storage().ref().child('images/'+ firebase.auth().currentUser.email + '/'  + fileName);
    fileRef.getDownloadURL().then(
      (url) => {
        console.log(url);
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = function(event) {
          var blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
    }).catch((error => {
      console.log(error);
    }
    ));
  }


  ngOnInit() {
    this.fichier = new Fichier('', '', '','','','');
    const uuid = this.route.snapshot.params['uuid'];
    this.fichierService.findFichierByUuid(uuid).then(
      (fichier: Fichier) => {
        console.log(fichier);
        this.fichier = fichier;
      }
    ).then(
      () => {
        this.downloadFile(this.fichier.filename);
      }
    );
  }




}
