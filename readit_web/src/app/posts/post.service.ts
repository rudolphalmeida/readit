import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PostList } from './post';
import { apiUrl } from '../api-util';

@Injectable({
    providedIn: 'root',
})
export class PostService {
    constructor(private http: HttpClient) {}

    getPosts(): Observable<PostList> {
        return this.http.get(apiUrl('posts')) as Observable<PostList>;
    }
}
