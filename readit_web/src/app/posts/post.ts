import {User} from "../user-auth/user-auth";
import {Subreadit} from "../subreadit";

export interface Post {
    title: string;
    text: string;
    posted_by: User;
    created_on: Date;
    posted_subreadit: Subreadit;
}

export interface PostList {
    count: number;
    next: string | null;
    previous: string | null;
    results: Post[];
}
