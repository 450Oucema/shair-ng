import { Component } from '@angular/core';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    const config = {
      apiKey: 'AIzaSyD-YBXNOKY9Fqvj8T6GRwvlCEfFTTIwiOg',
      authDomain: 'shair-ng.firebaseapp.com',
      databaseURL: 'https://shair-ng.firebaseio.com',
      projectId: 'shair-ng',
      storageBucket: 'shair-ng.appspot.com',
      messagingSenderId: '87877285258',
      appId: '1:87877285258:web:98c0532062c86cff0e4473'
    };
    firebase.initializeApp(config);
  }


}
