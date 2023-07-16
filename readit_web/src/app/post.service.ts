import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Post, PostList } from './post';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<PostList> {
    return this.http.get(
      'http://127.0.0.1:8000/api/posts'
    ) as Observable<PostList>;
  }
}
