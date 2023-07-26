import {Subreadit} from "../subreadit";
import {Post} from "../posts/post";

export interface UserDetail {
    url: string;
    username: string;
    email: string;
    created: Subreadit[];
    subscribes: Subreadit[];
    posts: Post[];
}
