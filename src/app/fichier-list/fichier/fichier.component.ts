import { Component, OnInit } from '@angular/core';
import {Fichier} from "../../models/fichier.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FichierService} from "../../services/fichier.service";
import {TypeService} from '../../services/type.service';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { ActionSheetController } from '@ionic/angular';;

@Component({
  selector: 'app-fichier',
  templateUrl: './fichier.component.html',
  styleUrls: ['./fichier.component.css']
})
export class FichierComponent implements OnInit {

  fichier: Fichier;
  fichierJson;
  fichierText;

  constructor(private route: ActivatedRoute, public fichierService: FichierService, private router: Router, public typeService: TypeService, private http: HttpClient,
              public actionSheetController: ActionSheetController) {
  }

  ngOnInit() {
    this.fichier = new Fichier('', '', '', '', '', '', null);
    var uuid = this.route.snapshot.params['uuid'];
    let fichierUnique: Fichier;
    this.fichierService.findFichierByUuid(this.fichier.uuid).then(
      (fichiers: Fichier []) => {
        this.fichier = fichiers.find(element => element.uuid == uuid);
        if (this.typeService.checkJson(this.fichier.filext)) {
          this.getContent().subscribe(data => {
            this.fichierJson = data;
          });
        }
        //Check if file is plaintext
        if (this.typeService.checkText(this.fichier.filext)) {
          this.getContentText().subscribe(data => {
            this.fichierText = data;
          });
        }
      }
    );
  }

  public getContent(): Observable<any> {
    return this.http.get(this.fichier.details);
  }

  public getContentText(): Observable<any> {
    return this.http.get(this.fichier.details, {responseType: 'text'});
  }


  async showContextMenu() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Actions',
      buttons: [{
        text: 'Copier le lien',
        icon: 'copy-outline',
        handler: () => {
          this.onCopy(this.fichier.details);
        }
      }, {
        text: 'Envoyer par mail',
        icon: 'mail',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: 'Télécharger',
        icon: 'cloud-download-outline',
        handler: () => {
          this.fichierService.onDownload(this.fichier.details)
        }
      }, {
        text: 'Fermer',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
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
}
