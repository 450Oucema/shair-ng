import { Component, OnInit } from '@angular/core';
import {Fichier} from "../../models/fichier.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FichierService} from "../../services/fichier.service";
import {TypeService} from '../../services/type.service';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-fichier',
  templateUrl: './fichier.component.html',
  styleUrls: ['./fichier.component.css']
})
export class FichierComponent implements OnInit {

  fichier: Fichier;
  fichierJson;
  fichierText;

  constructor(private route: ActivatedRoute, private fichierService: FichierService, private router: Router, private typeService: TypeService, private http: HttpClient) { }

  ngOnInit() {
    this.fichier = new Fichier('', '', '','','','',null);
    const id = this.route.snapshot.params['id'];
    this.fichierService.getSingleFichier(+id).then(
      (fichier: Fichier) => {
        this.fichier = fichier;
        //Check if file is json
        if (this.typeService.checkJson(fichier.filext)) {
          this.getContent().subscribe(data => {
            this.fichierJson = data;
          });
        }
        //Check if file is plaintext
        if (this.typeService.checkText(fichier.filext)) {
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
    return this.http.get(this.fichier.details, { responseType: 'text' });
  }
}
