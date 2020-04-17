import { Component, OnInit ,Input, OnDestroy} from '@angular/core';
import {PostsService} from '../services/posts.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: any[];
  postSubscription: Subscription;


  constructor(private postsService: PostsService,private router: Router) { }
  lastUpdate = new Promise((resolve, reject) => {
    const date = new Date();
    setTimeout(
      () => {
        resolve(date);
      }, 2000
    );
  });


  
  ngOnInit() {
    console.log("postlistcomponenet");
    this.postSubscription = this.postsService.postSubject.subscribe(

      (posts: any[]) => {
        this.posts = posts;
      }
    );
    this.postsService.emitPostSubject();
  }


  onNewPost() {
    this.router.navigate(['/posts', 'new']);
  }
  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }
  }
  