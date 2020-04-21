import { Component, OnInit } from '@angular/core';
import {FichierService} from '../../services/fichier.service';
import { Subscription } from 'rxjs';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit {
  userSubscription: Subscription;
  users: Array<any>;
  constructor(public fichierService: FichierService, public authService: AuthService) { }

  ngOnInit() {
    this.userSubscription = this.fichierService.usersSubject.subscribe(
      (users: Array<any>) => {
        this.users = users;
      }
    );
    this.fichierService.getUsersFiles();
  }

  getId(user: Object) {
    return Object.getOwnPropertyNames(user);
  }

}
