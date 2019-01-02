import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../../post.model';
import { Title } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { stringify } from '@angular/core/src/util';
import {map} from 'rxjs/operators';
import { post } from 'selenium-webdriver/http';
import { Router } from '@angular/router';




@Injectable({providedIn: 'root'})

export class TodoService {
  private posts: Post[] = [];
  private postsUpdated = new Subject <Post[]>();

  constructor(private http: HttpClient, private router: Router) { }

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/posts'
      )
      .pipe(map((postData) => {
        return postData.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            creator: post.creator
          };
        });
      }))
      .subscribe(transformedPosts => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });

  }
getPostUpdateListener() {
return this.postsUpdated.asObservable();
}
getTask(id: string) {
  return { ...this.posts.find(p => p.id === id) };

  // return this.http.get<{_id: string, title: string, content: string }>('http://localhost:3000/posts/' + id);

}
  addPost(title: string, content: string) {
    const post: Post = {id: null, title: title, content: content, creator: null};
    this.http.post<{message: string, postId: string}>('http://localhost:3000/posts', post)
    .subscribe(responseData => {
      const Id = responseData.postId;
      post.id = Id;
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
    this.router.navigate(['/']);
    });
  }

     updateTask(id: string, title: string, content: string ) {
     const post: Post = {id: id, title: title, content: content, creator: null };
     this.http.put('http://localhost:3000/posts/' + id, post)
     .subscribe(response => console.log(response));
      this.router.navigate(['/']);
     // const updatedPosts = [...this.posts];
     // const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
     // updatedPosts[ oldPostIndex ] = post;
    // this.posts = updatedPosts;
    // this.postsUpdated.next([...this.posts]);
   // });

  }


deletePost(postId: string ) {
this.http.delete('http://localhost:3000/posts/' + postId )
.subscribe(() => {
const updatedPosts = this.posts.filter(post => post.id !== postId);
this.posts = updatedPosts;
this.postsUpdated.next([...this.posts]);


});
}

}
