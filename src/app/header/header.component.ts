import { Component, OnInit } from '@angular/core';
import {MenuController} from "@ionic/angular";
import * as firebase from "firebase";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isAuth: boolean;

  constructor(private menu: MenuController, private authService: AuthService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    )
  }
  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  onSignOut() {
    this.authService.signOutUser();
  }
}
