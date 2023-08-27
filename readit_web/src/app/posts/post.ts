import {PaginatedEndpoint} from "../utils/paginated_endpoint";

export interface Post {
    id: number;
    title: string;
    text: string;
    posted_by: string;
    created_on: Date;
    posted_subreadit: string;
}

export type PostList = PaginatedEndpoint<Post>;
