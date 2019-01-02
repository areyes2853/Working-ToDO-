import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from './shared/todo.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PortalHostDirective } from '@angular/cdk/portal';
import { AppRoutingModule } from '../app-routing.module';
import { Post } from '../post.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})


export class TodoComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  public post: Post;
  private mode = 'create';
  private postId: string;



  constructor(public postsService: TodoService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.post = this.postsService.getTask(this.postId);
         // .subscribe(postData => {
        // this.post = {id: postData._id, title: postData.title, content: postData.content};
        // });
      } else {
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSaveTask(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.postsService.addPost(form.value.title, form.value.content);
    } else {
      this.postsService.updateTask(this.postId, form.value.title, form.value.content);
    }
  form.resetForm();
  }




}
