import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { post } from '../models/post.model';
import * as firebase from 'firebase';
import Datasnapshot = firebase.database.DataSnapshot;

@Injectable({
  providedIn: 'root'
})
export class PostsService {



  postSubject = new Subject<any[]>();

  constructor(private httpClient: HttpClient) { }



  private posts = [
    {
      id: 1,
      title: 'Bombe Nucelaire',
      content: 'la bombe h a ete cree pour pouvoir pulveriser les chinois',
      loveIt: 2,
      dontLoveIt: 5,
      created_at: '16/10/2048'
    },
    {
      id: 2,
      title: 'Thermodynamique',
      content: 'la thermo ca sert pour le cafe',
      loveIt: 16,
      dontLoveIt: 5,
      created_at:'16/10/2048'
    },

  ];

  emitPostSubject() {
    this.postSubject.next(this.posts.slice());
  }

  getPostById(id: number) {
    const post = this.posts.find(
      (s) => {
        return s.id === id;
      }
    );
    return post;
  }

  addThumbUp(index: number) {
    this.posts[index].loveIt = this.posts[index].loveIt + 1;
    this.emitPostSubject();
  }
  addThumbDown(index: number) {
    this.posts[index].dontLoveIt = this.posts[index].dontLoveIt + 1;
    this.emitPostSubject();
  }


  createNewPost(newPost: post) {
    newPost.id = this.posts[(this.posts.length - 1)].id + 1;
    newPost.loveIt = 0;
    newPost.dontLoveIt = 0;
    this.posts.push(newPost);
    this.saveBooks();
    this.emitPostSubject();
  }


  removePost(p: post) {
    const postIndexToRemove = this.posts.findIndex(
      (currPost) => {
        if (currPost === p) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    this.saveBooks();
    this.emitPostSubject();
  }

  saveBooks() {
    firebase.database().ref('/posts').set(this.posts);
  }

  //   saveAppareilsToServer() {
  //     this.httpClient
  //       .put('https://first-project-angular-7465f.firebaseio.com/appareils.json', this.appareils)
  //       .subscribe(
  //         () => {
  //           console.log('Enregistrement terminé !');
  //         },
  //         (error) => {
  //           console.log('Erreur ! : ' + error);
  //         }
  //       );
  // }

  // getAppareilsFromServer() {
  //     this.httpClient
  //       .get<any[]>('https://first-project-angular-7465f.firebaseio.com/appareils.json')
  //       .subscribe(
  //         (response) => {
  //           this.appareils = response;
  //           this.emitAppareilSubject();
  //         },
  //         (error) => {
  //           console.log('Erreur ! : ' + error);
  //         }
  //       );
}