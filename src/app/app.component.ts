import { Component } from '@angular/core';
import * as firebase from 'firebase'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book-project';
  constructor() {
    const config = {
      apiKey: 'AIzaSyCp6YpXM70xmtVwj4UWuNLsOgu_N9-9r6E',
      authDomain: 'book-project-9487f.firebaseapp.com',
      databaseURL: 'https://book-project-9487f.firebaseio.com',
      projectId: 'book-project-9487f',
      storageBucket: 'book-project-9487f.appspot.com',
      messagingSenderId: '283043409126'
    };
    firebase.initializeApp(config);
  }
}
