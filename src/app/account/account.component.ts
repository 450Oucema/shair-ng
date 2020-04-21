import { Component, OnInit } from '@angular/core';
import {HeaderComponent} from '../header/header.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(public headerComponent: HeaderComponent) { }

  ngOnInit() {
  }

}
