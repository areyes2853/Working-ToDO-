import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import { Post} from '../post.model';
import { TodoService } from '../todo/shared/todo.service';
import { createOfflineCompileUrlResolver } from '@angular/compiler';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})




export class TaskListComponent implements OnInit, OnDestroy {
 posts: Post[] = [];
 private postsSub: Subscription;
private authStatusSubs: Subscription;
userIsAuthenticated = false;
userId: string;


 constructor(public postsService: TodoService, private authService: AuthService) {}


  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener().subscribe((posts: Post[]) => { this.posts = posts; });
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getisAuth();
    this.authStatusSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

  }


  onDelete(postId: string) {
    this.postsService.deletePost(postId);

  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSubs.unsubscribe();
  }

}
