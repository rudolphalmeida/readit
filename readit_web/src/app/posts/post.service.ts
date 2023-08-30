import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { PostList } from "./post";
import { apiUrl } from "../utils/api-util";

@Injectable({
    providedIn: "root",
})
export class PostService {
    constructor(private http: HttpClient) {}

    getGeneralHomePosts(): Observable<PostList> {
        return this.http.get(apiUrl("posts/home")) as Observable<PostList>;
    }

    getHomePostsForUser(username: string): Observable<PostList> {
        return this.http.get(apiUrl(`posts/home/u/${username}`)) as Observable<PostList>;
    }

    getUserPostsFromUrl(url: string): Observable<PostList> {
        return this.http.get(url) as Observable<PostList>;
    }

    getUserPosts(username: string): Observable<PostList> {
        return this.http.get(apiUrl(`posts/${username}`)) as Observable<PostList>;
    }
}
