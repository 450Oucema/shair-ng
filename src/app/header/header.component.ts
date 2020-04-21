import { Component, OnInit } from '@angular/core';
import {MenuController} from "@ionic/angular";
import * as firebase from "firebase";
import {AuthService} from "../services/auth.service";
import {Admin} from '../models/admin.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isAuth: boolean;
  public isAdmin: boolean;
  public admins: Admin[];
  public userUid:string;

  constructor(private menu: MenuController, private authService: AuthService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
          this.userUid = user.uid;
        } else {
          this.isAuth = false;
        }
       this.getAdmins().then(
         (admins: Admin[]) => {
           this.admins = admins;
           this.isAdmin = this.checkIfAdmin(admins);
         }
       )
      }
    );
  }

   checkIfAdmin(admins: Admin[]) {
    if(!admins) {
      return false;
    }
    if(admins.find(element => element.uid === this.userUid)) {
      return true;
    }
    return false;
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  public onSignOut() {
    this.authService.signOutUser();
  }

  getAdmins() {
    return new Promise(
      (resolve,reject) => {
        firebase.database().ref('/admin/').once('value').then(
          (data) => {
            resolve(data.val());
        })
      }
    )
  }
}
