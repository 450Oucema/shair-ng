import { Component, OnInit } from '@angular/core';
import {FichierService} from '../../../services/fichier.service';
import {ActivatedRoute} from '@angular/router';
import {Fichier} from '../../../models/fichier.model';
import { Subscription } from 'rxjs';
import {TypeService} from '../../../services/type.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  fichiers: Fichier[];

  private fichierSubscription: Subscription;
  constructor(public fichierService: FichierService, private route: ActivatedRoute, public typeService: TypeService) { }

  ngOnInit() {
    var uuid = this.route.snapshot.params['uid'];
    this.fichierSubscription = this.fichierService.fichiersSubject.subscribe(
      (fichiers: Fichier[]) => {
        this.fichiers = fichiers;
      }
    );
    this.fichierService.getFichiers(uuid);
  }

}
