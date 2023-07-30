import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, firstValueFrom } from "rxjs";

import { UserAuthService } from "../user-auth/user-auth.service";
import { apiUrl } from "../utils/api-util";
import { User } from "../user-auth/user-auth";
import { Post, PostList } from "../posts/post";
import { PostService } from "../posts/post.service";

@Component({
    selector: "readit-user-profile",
    templateUrl: "./user-profile.component.html",
    styleUrls: ["./user-profile.component.less"],
})
export class UserProfileComponent implements OnInit {
    username: string = "";
    user_details: User | null = null;
    post_list: BehaviorSubject<PostList | null> = new BehaviorSubject<PostList | null>(null);
    posts: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([]);

    constructor(
        private userAuthService: UserAuthService,
        private route: ActivatedRoute,
        private router: Router,
        private http: HttpClient,
        private postService: PostService,
    ) {}

    ngOnInit() {
        this.route.paramMap.subscribe((param) => {
            if (param.has("username")) {
                const username = param.get("username");
                if (!username) {
                    this.router.navigate([""]).then((r) => {});
                } else {
                    this.username = username;
                    this.loadUserProfile().then((_) => {});
                }
            } else {
                this.router.navigate([""]).then((r) => {});
            }
        });

        this.post_list.subscribe((post_list) => {
            if (post_list == null) {
                this.posts.next([]);
            } else {
                this.posts.next(post_list.results);
            }
        });
    }

    async loadUserProfile() {
        if (!this.username) {
            return;
        }

        this.user_details = (await firstValueFrom(
            this.http.get(apiUrl(`users/${this.username}`), { withCredentials: true }),
        )) as User;

        this.postService.getUserPosts(this.username).subscribe({
            next: (postList: PostList) => {
                this.post_list.next(postList);
            },
            error: (error) => {
                console.log(error);
            },
        });
    }

    loadPrevHomePosts() {}

    loadNextHomePosts() {}
}
