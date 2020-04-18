import { Component, OnInit, Input } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { post } from '../models/post.model';


@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.css']
})
export class PostListItemComponent implements OnInit {

  @Input() title: string;
  @Input() content: string;
  @Input() loveIt: number;
  @Input() dontLoveIt: number;
  @Input() index: number;
  @Input() id: number;
  @Input() created_at: Date;

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {

    //regler le probleme pour les NAN TODO
    this.dontLoveIt = this.dontLoveIt == null? 0 :this.dontLoveIt;
    this.loveIt = this.loveIt == null? 0 :this.loveIt;
  }

  //TODO
  getTitle() {
    return this.title;
  }
  getContent() {
    return this.content;
  }
  getCreationDate() {
    return this.created_at;
  }
  getLoveIt() {
    return this.loveIt ;
  }
  getDontLoveIt() {
    return this.dontLoveIt ;
  }
  getColor() {
    if (this.getLoveIt === this.getDontLoveIt) {
      return 'white';
    } else if (this.getLoveIt > this.getDontLoveIt) {
      return 'green';
    } else {
      return 'red';
    }
  }

  onLoveIt() {
    this.postsService.addThumbUp(this.index);
  }
  onDontLoveIt() {
    this.postsService.addThumbDown(this.index);
  }

  //TODO trouver un meilleur moyen de recuoperer le post 
  //
  getPost() {
    return this.postsService.getPostById(this.id);
  }

  onDeletePost(p: post) {
    this.postsService.removePost(p);
  }
}



