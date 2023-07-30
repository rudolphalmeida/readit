export interface Post {
    id: number;
    title: string;
    text: string;
    posted_by: string;
    created_on: Date;
    posted_subreadit: string;
}

export interface PostList {
    count: number;
    next: string | null;
    previous: string | null;
    results: Post[];
}
