import { Component, OnInit } from '@angular/core';
import {Fichier} from "../../models/fichier.model";
import {ActivatedRoute, Router} from "@angular/router";
import {FichierService} from "../../services/fichier.service";

@Component({
  selector: 'app-fichier',
  templateUrl: './fichier.component.html',
  styleUrls: ['./fichier.component.css']
})
export class FichierComponent implements OnInit {

  fichier: Fichier;

  constructor(private route: ActivatedRoute, private fichierService: FichierService, private router: Router) { }

  ngOnInit() {
    this.fichier = new Fichier('', '', '');
    const id = this.route.snapshot.params['id'];
    this.fichierService.getSingleFichier(+id).then(
      (fichier: Fichier) => {
        this.fichier = fichier;
        alert(this.fichier.uuid);
      }
    );
  }

}
