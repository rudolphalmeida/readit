import { Component, OnInit } from "@angular/core";

import { PostService } from "../posts/post.service";
import { Post, PostList } from "../posts/post";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: "readit-user-home",
    templateUrl: "./user-home.component.html",
    styleUrls: ["./user-home.component.less"],
})
export class UserHomeComponent implements OnInit {
    posts: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
    next_posts_page: string | null = null;
    previous_posts_page: string | null = null;

    constructor(private postService: PostService) {}

    ngOnInit(): void {
        this.getPosts();
    }

    getPosts() {
        this.postService.getPosts().subscribe({
            next: (postList: PostList) => {
                this.posts.next(postList.results);
                this.next_posts_page = postList.next;
                this.previous_posts_page = postList.previous;
            },
            error: (error) => {
                console.log(error);
            },
        });
    }

    loadNextPageOfPosts(): void {}

    loadPreviousPageOfPosts(): void {}
}
