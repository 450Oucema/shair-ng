import { Component, OnInit } from '@angular/core';
import {Fichier} from '../../models/fichier.model';
import {ActivatedRoute, Router} from '@angular/router';
import {FichierService} from '../../services/fichier.service';
import Downloader from 'js-file-downloader';

@Component({
  selector: 'app-download-file',
  templateUrl: './download-file.component.html',
  styleUrls: ['./download-file.component.css']
})
export class DownloadFileComponent implements OnInit {

  fichier: Fichier;

  constructor(private route: ActivatedRoute, private fichierService: FichierService, private router: Router) { }

  private downloadFile(fileUrl) {
    new Downloader({
      url: fileUrl
    })
      .then( () => {
        alert('fini');
      })
      .catch( (error) => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.fichier = new Fichier('', '', '','');
    const uuid = this.route.snapshot.params['uuid'];
    this.fichierService.findFichierByUuid(uuid).then(
      (fichier: Fichier) => {
        this.fichier = fichier;
      }
    ).then(
      () => {
        console.log(this.fichier.details);
        this.downloadFile(this.fichier.details);
      }
    );
  }




}
