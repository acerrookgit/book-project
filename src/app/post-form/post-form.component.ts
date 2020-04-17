import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { post } from '../models/post.model';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {

  pForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private postService: PostsService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.pForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  onSavePost() {
    const title = this.pForm.get('title').value;
    const content = this.pForm.get('content').value;
    // const loveIt = this.postForm.get('loveIt').value;
    // const dontLoveIt = this.postForm.get('dontLoveIt').value;
    // const created_at = this.pForm.get('created_at').value;

    const newPost = new post();
    newPost.title = title;
    newPost.content = content;
    var d = new Date();
    //TODO ajouter un format de date 
    newPost.created_at = d.toLocaleDateString();
    console.log(newPost.created_at);


    this.postService.createNewPost(newPost);
    this.router.navigate(['/posts']);
  }
}