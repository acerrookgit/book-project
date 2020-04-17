import { Component, OnInit } from '@angular/core';
import {ActivatedRoute,Router} from '@angular/router'
import {post} from '../models/post.model';
import {PostsService} from '../services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {

  title: string = 'titre';
  content: string = 'contenu';
  created_at: String = '';

  constructor( private route: ActivatedRoute, private postservice:PostsService, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.title = this.postservice.getPostById(+id).title;
    this.content = this.postservice.getPostById(+id).content;
    this.created_at = this.postservice.getPostById(+id).created_at;
  }

  
  onBack() {
    this.router.navigate(['/posts']);
  }
}
