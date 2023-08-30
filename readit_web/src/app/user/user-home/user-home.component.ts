import {Component, OnInit} from "@angular/core";
import {BehaviorSubject} from "rxjs";

import {PostService} from "../../posts/post.service";
import {Post, PostList} from "../../posts/post";
import {UserAuthService} from "../user-auth.service";

@Component({
    selector: "readit-user-home",
    templateUrl: "./user-home.component.html",
    styleUrls: ["./user-home.component.less"],
})
export class UserHomeComponent implements OnInit {
    home_posts: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);
    home_post_list: BehaviorSubject<PostList | null> = new BehaviorSubject<PostList | null>(null);

    constructor(private postService: PostService, private userAuthService: UserAuthService) {
    }

    ngOnInit(): void {
        this.home_post_list.subscribe((post_list) => {
            if (post_list == null) {
                this.home_posts.next([]);
            } else {
                this.home_posts.next(post_list.results);
            }
        });
        this.getHomePosts();
    }

    getHomePosts() {
        const username = this.userAuthService.loggedInUserName;
        const postsObservable = username ? this.postService.getHomePostsForUser(username) : this.postService.getGeneralHomePosts();
        postsObservable.subscribe({
            next: (postList: PostList) => {
                this.home_post_list.next(postList);
            },
            error: (error) => {
                console.log(error);
            },
        });
    }

    loadNextHomePosts() {
    }

    loadPrevHomePosts() {
    }
}
