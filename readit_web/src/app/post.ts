export interface Post {
  title: string;
  text: string;
  posted_by_url: string;
  created_on: Date;
  posted_subreadit: string;
}

export interface PostList {
  count: number;
  next: string | null;
  previous: string | null;
  results: Post[];
}
